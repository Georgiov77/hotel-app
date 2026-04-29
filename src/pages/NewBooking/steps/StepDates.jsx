import FormField from '@components/FormField/FormField'
import useDates from '@hooks/useDates'
import './StepDates.css'

function StepDates({ booking, updateBooking }) {
    const { today, handleDateChange, handleGuestsChange } = useDates(booking, updateBooking)

    return (
        <div className="step-dates">
            <div className="step-dates__grid">
                <FormField label="Ημερομηνία Άφιξης">
                    <input
                        type="date"
                        className="form-field__input"
                        value={booking.checkIn}
                        min={today}
                        onChange={(e) => handleDateChange('checkIn', e.target.value)}
                    />
                </FormField>

                <FormField label="Ημερομηνία Αναχώρησης">
                    <input
                        type="date"
                        className="form-field__input"
                        value={booking.checkOut}
                        min={booking.checkIn || today}
                        onChange={(e) => handleDateChange('checkOut', e.target.value)}
                    />
                </FormField>

                <FormField label="Ενήλικες">
                    <input
                        type="number"
                        className="form-field__input"
                        min={1}
                        max={6}
                        value={booking.adults}
                        onChange={(e) => handleGuestsChange('adults', e.target.value)}
                    />
                </FormField>

                <FormField label="Παιδιά">
                    <input
                        type="number"
                        className="form-field__input"
                        min={0}
                        max={6}
                        value={booking.children}
                        onChange={(e) => handleGuestsChange('children', e.target.value)}
                    />
                </FormField>
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