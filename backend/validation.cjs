// Validation layer για το IPC boundary — οι handlers καλούν αυτές τις
// συναρτήσεις πριν περάσουν δεδομένα στα repositories. Σφάλματα φεύγουν
// σαν Error('VALIDATION_ERROR:φιλικό μήνυμα'); ο renderer (rethrowIpcError
// στο errorHandler.js) τα ξαναφτιάχνει σε AppError με το σωστό code.
const ROOM_STATUSES = ['available', 'occupied', 'maintenance']
const BOOKING_STATUSES = ['confirmed', 'checked_in', 'checked_out', 'cancelled']
const PAYMENT_STATUSES = ['unpaid', 'deposit', 'paid']
const BOOKING_SOURCES = ['frontdesk', 'booking_com', 'walk_in', 'phone']

function fail(message) {
    throw new Error(`VALIDATION_ERROR:${message}`)
}

function validateGuest(guest) {
    if (!guest?.firstName?.trim()) fail('Το όνομα είναι υποχρεωτικό')
    if (!guest?.lastName?.trim()) fail('Το επώνυμο είναι υποχρεωτικό')
    if (guest.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)) {
        fail('Μη έγκυρη διεύθυνση email')
    }
}

function validateRoomStatus(status) {
    if (!ROOM_STATUSES.includes(status)) fail('Μη έγκυρη κατάσταση δωματίου')
}

function validateBookingStatus(status) {
    if (!BOOKING_STATUSES.includes(status)) fail('Μη έγκυρη κατάσταση κράτησης')
}

function validateBooking(booking) {
    if (!booking?.roomId) fail('Το δωμάτιο είναι υποχρεωτικό')
    if (!booking?.guestId) fail('Ο πελάτης είναι υποχρεωτικός')
    if (!booking?.checkIn || !booking?.checkOut) fail('Οι ημερομηνίες είναι υποχρεωτικές')
    if (new Date(booking.checkOut) <= new Date(booking.checkIn)) {
        fail('Το check-out πρέπει να είναι μετά το check-in')
    }
    if (!(booking.adults >= 1)) fail('Πρέπει να υπάρχει τουλάχιστον 1 ενήλικας')
    if (!(booking.children >= 0)) fail('Μη έγκυρος αριθμός παιδιών')
    if (!(booking.pricePerNight >= 0)) fail('Μη έγκυρη τιμή ανά νύχτα')
    if (!(booking.totalAmount >= 0)) fail('Μη έγκυρο συνολικό ποσό')
    if (!(booking.depositAmount >= 0)) fail('Μη έγκυρη προκαταβολή')
    if (!(booking.paidAmount >= 0)) fail('Μη έγκυρο ποσό πληρωμής')
    if (booking.status && !BOOKING_STATUSES.includes(booking.status)) {
        fail('Μη έγκυρη κατάσταση κράτησης')
    }
    if (booking.paymentStatus && !PAYMENT_STATUSES.includes(booking.paymentStatus)) {
        fail('Μη έγκυρη κατάσταση πληρωμής')
    }
    if (booking.source && !BOOKING_SOURCES.includes(booking.source)) {
        fail('Μη έγκυρη προέλευση κράτησης')
    }
}

module.exports = { validateGuest, validateRoomStatus, validateBookingStatus, validateBooking }
