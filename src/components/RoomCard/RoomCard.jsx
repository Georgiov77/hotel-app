import { Badge } from '@georgevlachos/ui'
import { Card } from '@georgevlachos/ui'
import { ROOM_STATUS_VARIANT, ROOM_STATUS_LABEL } from '@config/statuses'
import './RoomCard.css'

function RoomCard({ room }) {
    return (
        <Card>
            <div className="room-card">
                <div className="room-card__header">
                    <span className="room-card__number">#{room.number}</span>
                    <Badge
                        label={ROOM_STATUS_LABEL[room.status]}
                        variant={ROOM_STATUS_VARIANT[room.status]}
                    />
                </div>
                <span className="room-card__type">{room.type}</span>
                <div className="room-card__details">
                    <span className="room-card__detail">👤 {room.capacity} άτομα</span>
                    <span className="room-card__detail">
                        {room.hasKitchen ? '🍳 Με κουζίνα' : ' Χωρίς κουζίνα'}
                    </span>
                </div>
            </div>
        </Card>
    )
}

export default RoomCard