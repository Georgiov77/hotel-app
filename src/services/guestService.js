import { withErrorHandling } from '@error/errorHandler'
import { ERROR_CODES }       from '@error/AppError'

const guestService = {
    getAll: () =>
        withErrorHandling(
            () => window.api.guests.getAll(),
            ERROR_CODES.DB_ERROR
        ),

    getById: (id) =>
        withErrorHandling(
            () => window.api.guests.getById(id),
            ERROR_CODES.GUEST_NOT_FOUND
        ),

    search: (query) =>
        withErrorHandling(
            () => window.api.guests.search(query),
            ERROR_CODES.DB_ERROR
        ),

    create: (guest) =>
        withErrorHandling(
            () => window.api.guests.create(guest),
            ERROR_CODES.DB_ERROR
        ),

    update: (id, guest) =>
        withErrorHandling(
            () => window.api.guests.update(id, guest),
            ERROR_CODES.DB_ERROR
        ),

    delete: (id) =>
        withErrorHandling(
            () => window.api.guests.delete(id),
            ERROR_CODES.DB_ERROR
        ),
}

export default guestService