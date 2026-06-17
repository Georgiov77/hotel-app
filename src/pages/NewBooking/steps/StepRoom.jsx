import { useState, useEffect } from 'react'
import { useToast }        from '@georgevlachos/ui'
import RoomCard            from '@components/RoomCard/RoomCard'
import roomService         from '@services/roomService'
import { getErrorMessage } from '@error/errorHandler'
import './StepRoom.css'

const floorLabels = {
    0: 'Ισόγειο',
    1: '1ος Όροφος',
    2: '2ος Όροφος',
}

function StepRoom({ booking, updateBooking }) {
    const { showToast } = useToast()

    const [rooms,     setRooms]     = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadAvailable()
    }, [booking.checkIn, booking.checkOut])

    const loadAvailable = async () => {
        try {
            setIsLoading(true)
            const data = await roomService.getAvailable(booking.checkIn, booking.checkOut)
            setRooms(data)
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSelectRoom = (room) => {
        updateBooking({ room, pricePerNight: 0 })
    }

    if (isLoading) return <div>Φόρτωση δωματίων...</div>

    return (
        <div className="step-room">
            {[0, 1, 2].map((floor) => {
                const floorRooms = rooms.filter((r) => r.floor === floor)
                if (!floorRooms.length) return null

                return (
                    <div key={floor} className="step-room__floor">
                        <div className="step-room__floor-title">{floorLabels[floor]}</div>
                        <div className="step-room__grid">
                            {floorRooms.map((room) => (
                                <div
                                    key={room.id}
                                    className={`step-room__card ${booking.room?.id === room.id ? 'step-room__card--selected' : ''}`}
                                    onClick={() => handleSelectRoom(room)}
                                >
                                    <RoomCard room={{
                                        ...room,
                                        hasKitchen: room.has_kitchen === 1,
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}

            {!rooms.length && (
                <div className="step-room__empty">
                    Δεν υπάρχουν διαθέσιμα δωμάτια για αυτές τις ημερομηνίες
                </div>
            )}

            {booking.room && (
                <div className="step-room__selected">
                    ✓ Επιλέξατε δωμάτιο Νο. {booking.room.number} — {booking.room.type}
                </div>
            )}
        </div>
    )
}

export default StepRoom