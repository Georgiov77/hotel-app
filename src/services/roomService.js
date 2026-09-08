import { withErrorHandling, rethrowIpcError } from '@error/errorHandler'
import { ERROR_CODES } from '@error/AppError'
import { normalizeRoom } from '@utils/normalizers'

const roomService = {
    getAll: () =>
        withErrorHandling(
            async () => (await window.api.rooms.getAll()).map(normalizeRoom),
            ERROR_CODES.DB_ERROR
        ),

    getAvailable: (checkIn, checkOut) =>
        withErrorHandling(
            async () => (await window.api.rooms.getAvailable(checkIn, checkOut)).map(normalizeRoom),
            ERROR_CODES.DB_ERROR
        ),

    updateStatus: (id, status) =>
        withErrorHandling(async () => {
            try {
                return await window.api.rooms.updateStatus(id, status)
            } catch (err) {
                rethrowIpcError(err)
            }
        }, ERROR_CODES.DB_ERROR),
}

export default roomService
