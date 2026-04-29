import { BASE_PRICES } from '@config/pricing'

export const calcBasePrice = (roomType) => {
    return BASE_PRICES[roomType] || 0
}

export const calcSeasonPrice = (basePrice, multiplier) => {
    return Math.round(basePrice * multiplier)
}

export const calcRoomTotal = (pricePerNight, nights) => {
    return pricePerNight * nights
}

export const calcExtrasTotal = (extras) => {
    return extras.reduce((sum, e) => sum + e.total, 0)
}

export const calcGrandTotal = (roomTotal, extrasTotal) => {
    return roomTotal + extrasTotal
}

export const calcDeposit = (grandTotal, pct) => {
    return Math.round(grandTotal * pct)
}

export const calcRemaining = (grandTotal, depositAmount) => {
    return grandTotal - depositAmount
}

export const stripUIFields = (booking) => {
    const { _customDeposit, season, ...rest } = booking
    return rest
}