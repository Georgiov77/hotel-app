import RoomCard  from '@components/RoomCard/RoomCard'
import useRooms  from '@hooks/useRooms'
import './Rooms.css'

const floorLabels = {
    0: 'Ισόγειο',
    1: '1ος Όροφος',
    2: '2ος Όροφος',
}

function Rooms() {
    const { rooms, isLoading } = useRooms()

    if (isLoading) return <div className="rooms__loading">Φόρτωση...</div>

    return (
        <div className="rooms">
            {[0, 1, 2].map((floor) => {
                const floorRooms = rooms.filter((r) => r.floor === floor)
                if (!floorRooms.length) return null

                return (
                    <div key={floor}>
                        <div className="rooms__floor-title">{floorLabels[floor]}</div>
                        <div className="rooms__grid">
                            {floorRooms.map((room) => (
                                <RoomCard key={room.id} room={{
                                    ...room,
                                    hasKitchen: room.has_kitchen === 1,
                                }} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Rooms