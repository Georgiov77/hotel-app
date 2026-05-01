import BookingBar from './BookingBar'
import './CalendarGrid.css'

const ROOM_COL_WIDTH = '100px'

function CalendarGrid({ days, rooms, bookings, isToday, onBookingClick, onCellClick }) {
    const totalDays = days.length
    const gridCols  = `${ROOM_COL_WIDTH} repeat(${totalDays}, 1fr)`

    const getDayLabel = (dateStr) => {
        const d = new Date(dateStr)
        return {
            name:   d.toLocaleDateString('el-GR', { weekday: 'short' }),
            number: d.getDate(),
        }
    }

    const getBookingsForRoom = (roomId) => {
        return bookings.filter((b) => b.roomId === roomId && b.status !== 'cancelled')
    }

    const calcBarPosition = (booking) => {
        const cinDate  = booking.checkIn
        const coutDate = booking.checkOut

        let startIdx = days.findIndex((d) => d >= cinDate && d < coutDate)
        if (startIdx < 0) return null

        let span = 0
        for (let i = startIdx; i < days.length; i++) {
            if (days[i] >= cinDate && days[i] < coutDate) span++
            else break
        }

        if (span === 0) return null
        return { startIdx, span }
    }

    return (
        <div className="calendar-grid">

            {/* Header με τις μέρες */}
            <div className="calendar-grid__header" style={{ gridTemplateColumns: gridCols }}>
                <div className="calendar-grid__corner">Δωμάτιο</div>
                {days.map((day) => {
                    const { name, number } = getDayLabel(day)
                    return (
                        <div
                            key={day}
                            className={`calendar-grid__day ${isToday(day) ? 'calendar-grid__day--today' : ''}`}
                        >
                            <div className="calendar-grid__day-name">{name}</div>
                            <div className="calendar-grid__day-number">{number}</div>
                        </div>
                    )
                })}
            </div>

            {/* Rows ανά δωμάτιο */}
            {rooms.map((room) => {
                const roomBookings = getBookingsForRoom(room.id)

                return (
                    <div key={room.id} className="calendar-grid__row" style={{ gridTemplateColumns: gridCols }}>
                        <div className="calendar-grid__room">
                            <span className="calendar-grid__room-number">Νο. {room.number}</span>
                            <span className="calendar-grid__room-type">{room.type}</span>
                        </div>

                        <div
                            className="calendar-grid__cells"
                            style={{ gridColumn: `2 / -1`, display: 'grid', gridTemplateColumns: `repeat(${totalDays}, 1fr)` }}
                        >
                            {/* Κελιά */}
                            {days.map((day) => (
                                <div
                                    key={day}
                                    className={`calendar-grid__cell ${isToday(day) ? 'calendar-grid__cell--today' : ''}`}
                                    onClick={() => onCellClick(day, room)}
                                />
                            ))}

                            {/* Booking bars */}
                            {roomBookings.map((booking) => {
                                const pos = calcBarPosition(booking)
                                if (!pos) return null
                                return (
                                    <BookingBar
                                        key={booking.id}
                                        booking={booking}
                                        startIdx={pos.startIdx}
                                        span={pos.span}
                                        totalDays={totalDays}
                                        onClick={onBookingClick}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default CalendarGrid