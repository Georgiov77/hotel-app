import './BookingBar.css'

function BookingBar({ booking, startIdx, span, totalDays, onClick }) {
    const left  = `${(startIdx / totalDays) * 100}%`
    const width = `calc(${(span / totalDays) * 100}% - 4px)`

    return (
        <div
            className={`booking-bar booking-bar--${booking.status}`}
            style={{ left, width }}
            onClick={(e) => {
                e.stopPropagation()
                onClick(booking)
            }}
            title={`${booking.guestName} | ${booking.checkIn} → ${booking.checkOut}`}
        >
            {booking.guestName}
        </div>
    )
}

export default BookingBar