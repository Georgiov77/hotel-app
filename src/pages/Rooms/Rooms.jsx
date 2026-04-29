import RoomCard from '@components/RoomCard/RoomCard'
import { mockRooms } from '@config/mockData'
import './Rooms.css'

const floorLabels = {
    0: 'Ισόγειο',
    1: '1ος Όροφος',
    2: '2ος Όροφος',
}

function Rooms() {
    const floors = [0, 1, 2]

    return (
        <div className="rooms">
            {floors.map((floor) => {
                const rooms = mockRooms.filter((r) => r.floor === floor)
                if (!rooms.length) return null

                return (
                    <div key={floor}>
                        <div className="rooms__floor-title">{floorLabels[floor]}</div>
                        <div className="rooms__grid">
                            {rooms.map((room) => (
                                <RoomCard key={room.id} room={room} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Rooms