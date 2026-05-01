// src/pages/Calendar/components/BookingBar.jsx
import './BookingBar.css'

function BookingBar({ booking, startIdx, span, totalDays, onClick }) {
    const left  = `${(startIdx / totalDays) * 100}%`
    const width = `calc(${(span / totalDays) * 100}% - 4px)`
    const name  = `${booking.last_name} ${booking.first_name}`

    return (
        <div
            className={`booking-bar booking-bar--${booking.status}`}
            style={{ left, width }}
            onClick={(e) => {
                e.stopPropagation()
                onClick(booking)
            }}
            title={`${name} | ${booking.check_in} → ${booking.check_out}`}
        >
            {name}
        </div>
    )
}

export default BookingBar