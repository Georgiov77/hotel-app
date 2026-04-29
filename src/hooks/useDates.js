import { calcNights, todayISO } from '@utils/dateUtils'

function useDates(booking, updateBooking) {
    const handleDateChange = (field, value) => {
        const updated = { ...booking, [field]: value }

        if (updated.checkIn && updated.checkOut) {
            const nights = calcNights(updated.checkIn, updated.checkOut)
            updated.nights = nights > 0 ? nights : 0
        }

        updateBooking(updated)
    }

    const handleGuestsChange = (field, value) => {
        updateBooking({ [field]: parseInt(value) })
    }

    return {
        today:             todayISO(),
        handleDateChange,
        handleGuestsChange,
    }
}

export default useDates