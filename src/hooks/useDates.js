import { calcNights, todayISO } from '@utils/dateUtils'

export const getInitialDates = (initialData = {}) => {
    const checkIn  = initialData.checkIn || todayISO()
    let   checkOut = initialData.checkOut || ''
    let   nights   = 0

    if (checkIn && !checkOut) {
        const nextDay = new Date(checkIn)
        nextDay.setDate(nextDay.getDate() + 1)
        checkOut = nextDay.toISOString().split('T')[0]
        nights   = 1
    }

    return { checkIn, checkOut, nights }
}

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
        today: todayISO(),
        handleDateChange,
        handleGuestsChange,
    }
}

export default useDates