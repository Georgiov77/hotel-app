import { Input } from '@georgevlachos/ui'
import useDates from '@hooks/useDates'
import './StepDates.css'

function StepDates({ booking, updateBooking }) {
    const { today, handleDateChange, handleGuestsChange } = useDates(booking, updateBooking)

    return (
        <div className="step-dates">
            <div className="step-dates__grid">
                <Input
                    label="Ημερομηνία Άφιξης"
                    type="date"
                    value={booking.checkIn}
                    min={today}
                    onChange={(e) => handleDateChange('checkIn', e.target.value)}
                    fullWidth
                />
                <Input
                    label="Ημερομηνία Αναχώρησης"
                    type="date"
                    value={booking.checkOut}
                    min={booking.checkIn || today}
                    onChange={(e) => handleDateChange('checkOut', e.target.value)}
                    fullWidth
                />
                <Input
                    label="Ενήλικες"
                    type="number"
                    min={1}
                    max={6}
                    value={booking.adults}
                    onChange={(e) => handleGuestsChange('adults', e.target.value)}
                    fullWidth
                />
                <Input
                    label="Παιδιά"
                    type="number"
                    min={0}
                    max={6}
                    value={booking.children}
                    onChange={(e) => handleGuestsChange('children', e.target.value)}
                    fullWidth
                />
            </div>

            {booking.nights > 0 && (
                <div className="step-dates__summary">
                    🌙 {booking.nights} διανυκτερεύσεις
                </div>
            )}
        </div>
    )
}

export default StepDates