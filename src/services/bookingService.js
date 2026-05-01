import { withErrorHandling } from '@error/errorHandler'
import { ERROR_CODES }       from '@error/AppError'
import { stripUIFields }     from '@utils/pricingUtils'
import { todayISO }          from '@utils/dateUtils'

const bookingService = {
    getAll: () =>
        withErrorHandling(
            () => window.api.bookings.getAll(),
            ERROR_CODES.DB_ERROR
        ),

    getById: (id) =>
        withErrorHandling(
            () => window.api.bookings.getById(id),
            ERROR_CODES.BOOKING_NOT_FOUND
        ),

    getByDateRange: (from, to) =>
        withErrorHandling(
            () => window.api.bookings.getByDateRange(from, to),
            ERROR_CODES.DB_ERROR
        ),

    getTodayCheckIns: () =>
        withErrorHandling(
            () => window.api.bookings.getTodayCheckIns(todayISO()),
            ERROR_CODES.DB_ERROR
        ),

    getTodayCheckOuts: () =>
        withErrorHandling(
            () => window.api.bookings.getTodayCheckOuts(todayISO()),
            ERROR_CODES.DB_ERROR
        ),

    create: (booking) =>
        withErrorHandling(
            () => {
                const clean  = stripUIFields(booking)
                const extras = clean.extras || []

                const bookingData = {
                    roomId:        clean.room.id,
                    guestId:       clean.guest.id,
                    checkIn:       clean.checkIn,
                    checkOut:      clean.checkOut,
                    nights:        clean.nights,
                    adults:        clean.adults,
                    children:      clean.children,
                    status:        'confirmed',
                    source:        clean.source,
                    pricePerNight: clean.pricePerNight,
                    totalAmount:   clean.totalAmount,
                    depositAmount: clean.depositAmount,
                    paidAmount:    clean.paidAmount,
                    paymentStatus: clean.paymentStatus,
                    notes:         clean.notes || '',
                }

                return window.api.bookings.create(bookingData, extras)
            },
            ERROR_CODES.DB_ERROR
        ),

    update: (id, booking) =>
        withErrorHandling(
            () => window.api.bookings.update(id, booking),
            ERROR_CODES.DB_ERROR
        ),

    updateStatus: (id, status) =>
        withErrorHandling(
            () => window.api.bookings.updateStatus(id, status),
            ERROR_CODES.DB_ERROR
        ),

    getExtras: (bookingId) =>
        withErrorHandling(
            () => window.api.bookings.getExtras(bookingId),
            ERROR_CODES.DB_ERROR
        ),

    delete: (id) =>
        withErrorHandling(
            () => window.api.bookings.delete(id),
            ERROR_CODES.DB_ERROR
        ),
}

export default bookingService