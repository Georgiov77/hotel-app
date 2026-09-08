import { withErrorHandling } from '@error/errorHandler'
import AppError, { ERROR_CODES } from '@error/AppError'
import { stripUIFields } from '@utils/pricingUtils'
import { normalizeBooking, normalizeBookingExtra } from '@utils/normalizers'
import { todayISO } from '@georgevlachos/utils'

const rethrowConflict = (err) => {
    if (err.message?.includes('BOOKING_CONFLICT')) {
        throw new AppError(
            ERROR_CODES.BOOKING_CONFLICT,
            'Το δωμάτιο δεν είναι διαθέσιμο για αυτές τις ημερομηνίες'
        )
    }
    throw err
}

const bookingService = {
    getAll: () =>
        withErrorHandling(
            async () => (await window.api.bookings.getAll()).map(normalizeBooking),
            ERROR_CODES.DB_ERROR
        ),

    getById: (id) =>
        withErrorHandling(
            async () => normalizeBooking(await window.api.bookings.getById(id)),
            ERROR_CODES.BOOKING_NOT_FOUND
        ),

    getByDateRange: (from, to) =>
        withErrorHandling(
            async () => (await window.api.bookings.getByDateRange(from, to)).map(normalizeBooking),
            ERROR_CODES.DB_ERROR
        ),

    getTodayCheckIns: () =>
        withErrorHandling(
            async () =>
                (await window.api.bookings.getTodayCheckIns(todayISO())).map(normalizeBooking),
            ERROR_CODES.DB_ERROR
        ),

    getTodayCheckOuts: () =>
        withErrorHandling(
            async () =>
                (await window.api.bookings.getTodayCheckOuts(todayISO())).map(normalizeBooking),
            ERROR_CODES.DB_ERROR
        ),

    create: (booking) =>
        withErrorHandling(async () => {
            const clean = stripUIFields(booking)
            const extras = clean.extras || []

            const bookingData = {
                roomId: clean.room.id,
                guestId: clean.guest.id,
                checkIn: clean.checkIn,
                checkOut: clean.checkOut,
                nights: clean.nights,
                adults: clean.adults,
                children: clean.children,
                status: 'confirmed',
                source: clean.source,
                pricePerNight: clean.pricePerNight,
                totalAmount: clean.totalAmount,
                depositAmount: clean.depositAmount,
                paidAmount: clean.paidAmount,
                paymentStatus: clean.paymentStatus,
                notes: clean.notes || '',
            }

            try {
                return normalizeBooking(await window.api.bookings.create(bookingData, extras))
            } catch (err) {
                rethrowConflict(err)
            }
        }, ERROR_CODES.DB_ERROR),

    update: (id, booking) =>
        withErrorHandling(async () => {
            try {
                return normalizeBooking(await window.api.bookings.update(id, booking))
            } catch (err) {
                rethrowConflict(err)
            }
        }, ERROR_CODES.DB_ERROR),

    updateStatus: (id, status) =>
        withErrorHandling(() => window.api.bookings.updateStatus(id, status), ERROR_CODES.DB_ERROR),

    getExtras: (bookingId) =>
        withErrorHandling(
            async () => (await window.api.bookings.getExtras(bookingId)).map(normalizeBookingExtra),
            ERROR_CODES.DB_ERROR
        ),

    delete: (id) => withErrorHandling(() => window.api.bookings.delete(id), ERROR_CODES.DB_ERROR),
}

export default bookingService
