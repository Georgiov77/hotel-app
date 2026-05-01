import { withErrorHandling } from '@error/errorHandler'
import { ERROR_CODES }       from '@error/AppError'

const roomService = {
    getAll: () =>
        withErrorHandling(
            () => window.api.rooms.getAll(),
            ERROR_CODES.DB_ERROR
        ),

    getAvailable: (checkIn, checkOut) =>
        withErrorHandling(
            () => window.api.rooms.getAvailable(checkIn, checkOut),
            ERROR_CODES.DB_ERROR
        ),

    updateStatus: (id, status) =>
        withErrorHandling(
            () => window.api.rooms.updateStatus(id, status),
            ERROR_CODES.DB_ERROR
        ),
}

export default roomService