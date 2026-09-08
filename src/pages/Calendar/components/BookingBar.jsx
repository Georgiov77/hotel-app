// src/pages/Calendar/components/BookingBar.jsx
import './BookingBar.css'

function BookingBar({ booking, startIdx, span, totalDays, onClick }) {
    const left = `${(startIdx / totalDays) * 100}%`
    const width = `calc(${(span / totalDays) * 100}% - 4px)`
    const name = `${booking.guestLastName} ${booking.guestFirstName}`

    return (
        <div
            className={`booking-bar booking-bar--${booking.status}`}
            style={{ left, width }}
            onClick={(e) => {
                e.stopPropagation()
                onClick(booking)
            }}
            title={`${name} | ${booking.checkIn} → ${booking.checkOut}`}
        >
            {name}
        </div>
    )
}

export default BookingBar
