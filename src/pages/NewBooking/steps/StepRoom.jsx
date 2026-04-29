import RoomCard from '@components/RoomCard/RoomCard'
import { mockRooms } from '@config/mockData'
import './StepRoom.css'

const floorLabels = {
    0: 'Ισόγειο',
    1: '1ος Όροφος',
    2: '2ος Όροφος',
}

function StepRoom({ booking, updateBooking }) {
    const availableRooms = mockRooms.filter((r) => r.status === 'available')
    const floors = [0, 1, 2]

    const handleSelectRoom = (room) => {
        updateBooking({ room, pricePerNight: 0 })
    }

    return (
        <div className="step-room">
            {floors.map((floor) => {
                const rooms = availableRooms.filter((r) => r.floor === floor)
                if (!rooms.length) return null

                return (
                    <div key={floor} className="step-room__floor">
                        <div className="step-room__floor-title">{floorLabels[floor]}</div>
                        <div className="step-room__grid">
                            {rooms.map((room) => (
                                <div
                                    key={room.id}
                                    className={`step-room__card ${booking.room?.id === room.id ? 'step-room__card--selected' : ''}`}
                                    onClick={() => handleSelectRoom(room)}
                                >
                                    <RoomCard room={room} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}

            {booking.room && (
                <div className="step-room__selected">
                    ✓ Επιλέξατε δωμάτιο Νο. {booking.room.number} — {booking.room.type}
                </div>
            )}
        </div>
    )
}

export default StepRoom