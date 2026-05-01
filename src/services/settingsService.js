import { withErrorHandling } from '@error/errorHandler'
import { ERROR_CODES }       from '@error/AppError'

const settingsService = {
    getAll: () =>
        withErrorHandling(
            () => window.api.settings.getAll(),
            ERROR_CODES.DB_ERROR
        ),

    set: (key, value) =>
        withErrorHandling(
            () => window.api.settings.set(key, value),
            ERROR_CODES.DB_ERROR
        ),
}

export default settingsService