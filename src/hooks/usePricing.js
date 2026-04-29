import { calcBasePrice, calcExtrasTotal, calcGrandTotal, calcDeposit } from '@utils/pricingUtils'

function usePricing(booking, updateBooking) {
    const basePrice   = calcBasePrice(booking.room?.type)
    const extrasTotal = calcExtrasTotal(booking.extras)
    const grandTotal  = calcGrandTotal(booking.totalAmount, extrasTotal)

    const handleSeasonChange = (season) => {
        if (season.id === 'custom') {
            updateBooking({ season: season.id, pricePerNight: 0, totalAmount: 0 })
            return
        }
        const price = calcDeposit(basePrice, season.multiplier)
        const total = price * booking.nights
        updateBooking({ season: season.id, pricePerNight: price, totalAmount: total })
    }

    const handleCustomPrice = (value) => {
        const price = parseFloat(value) || 0
        updateBooking({ pricePerNight: price, totalAmount: price * booking.nights })
    }

    const handleAddExtra = () => {
        const extra = {
            id:          Date.now(),
            description: '',
            pricePerDay: 0,
            days:        booking.nights,
            total:       0,
        }
        updateBooking({ extras: [...booking.extras, extra] })
    }

    const handleExtraChange = (id, field, value) => {
        const extras = booking.extras.map((e) => {
            if (e.id !== id) return e
            const updated = { ...e, [field]: value }
            updated.total = updated.pricePerDay * updated.days
            return updated
        })
        updateBooking({ extras })
    }

    const handleRemoveExtra = (id) => {
        updateBooking({ extras: booking.extras.filter((e) => e.id !== id) })
    }

    const handleDepositOption = (option) => {
        if (option.pct === null) {
            updateBooking({ paymentStatus: 'deposit', _customDeposit: true, depositAmount: 0, paidAmount: 0 })
            return
        }
        const deposit = calcDeposit(grandTotal, option.pct)
        updateBooking({
            paymentStatus:  option.pct === 0 ? 'unpaid' : option.pct === 1 ? 'paid' : 'deposit',
            depositAmount:  deposit,
            paidAmount:     deposit,
            _customDeposit: false,
        })
    }

    const handleCustomDeposit = (value) => {
        const amount = Math.min(parseFloat(value) || 0, grandTotal)
        updateBooking({
            depositAmount: amount,
            paidAmount:    amount,
            paymentStatus: amount >= grandTotal ? 'paid' : 'deposit',
        })
    }

    const isDepositActive = (option) => {
        if (option.id === 'unpaid') return booking.paymentStatus === 'unpaid'
        if (option.id === 'paid')   return booking.paymentStatus === 'paid'
        if (option.id === 'custom') return booking._customDeposit
        return booking.depositAmount === calcDeposit(grandTotal, option.pct)
    }

    return {
        basePrice,
        extrasTotal,
        grandTotal,
        handleSeasonChange,
        handleCustomPrice,
        handleAddExtra,
        handleExtraChange,
        handleRemoveExtra,
        handleDepositOption,
        handleCustomDeposit,
        isDepositActive,
    }
}

export default usePricing