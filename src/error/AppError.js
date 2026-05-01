export const ERROR_CODES = {
    // Database
    DB_ERROR:           'DB_ERROR',
    DB_NOT_FOUND:       'DB_NOT_FOUND',
    DB_DUPLICATE:       'DB_DUPLICATE',

    // Bookings
    BOOKING_NOT_FOUND:  'BOOKING_NOT_FOUND',
    BOOKING_CONFLICT:   'BOOKING_CONFLICT',

    // Guests
    GUEST_NOT_FOUND:    'GUEST_NOT_FOUND',

    // Rooms
    ROOM_NOT_FOUND:     'ROOM_NOT_FOUND',
    ROOM_UNAVAILABLE:   'ROOM_UNAVAILABLE',

    // Validation
    VALIDATION_ERROR:   'VALIDATION_ERROR',

    // Generic
    UNKNOWN_ERROR:      'UNKNOWN_ERROR',
}

class AppError extends Error {
    constructor(code, message, details = null) {
        super(message)
        this.name    = 'AppError'
        this.code    = code
        this.details = details
    }
}

export default AppError