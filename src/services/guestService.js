import { withErrorHandling, rethrowIpcError } from '@error/errorHandler'
import { ERROR_CODES } from '@error/AppError'
import { normalizeGuest } from '@utils/normalizers'

const guestService = {
    getAll: () =>
        withErrorHandling(
            async () => (await window.api.guests.getAll()).map(normalizeGuest),
            ERROR_CODES.DB_ERROR
        ),

    getById: (id) =>
        withErrorHandling(
            async () => normalizeGuest(await window.api.guests.getById(id)),
            ERROR_CODES.GUEST_NOT_FOUND
        ),

    search: (query) =>
        withErrorHandling(
            async () => (await window.api.guests.search(query)).map(normalizeGuest),
            ERROR_CODES.DB_ERROR
        ),

    create: (guest) =>
        withErrorHandling(async () => {
            try {
                return normalizeGuest(await window.api.guests.create(guest))
            } catch (err) {
                rethrowIpcError(err)
            }
        }, ERROR_CODES.DB_ERROR),

    update: (id, guest) =>
        withErrorHandling(async () => {
            try {
                return normalizeGuest(await window.api.guests.update(id, guest))
            } catch (err) {
                rethrowIpcError(err)
            }
        }, ERROR_CODES.DB_ERROR),

    delete: (id) => withErrorHandling(() => window.api.guests.delete(id), ERROR_CODES.DB_ERROR),
}

export default guestService
