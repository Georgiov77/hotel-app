// src/error/errorHandler.js
import AppError, { ERROR_CODES } from './AppError'

// Wrapper για async calls — χρησιμοποιείται στα services
export const withErrorHandling = async (fn, errorCode = ERROR_CODES.UNKNOWN_ERROR) => {
    try {
        return await fn()
    } catch (err) {
        if (err instanceof AppError) throw err
        throw new AppError(errorCode, err.message, err)
    }
}

// Main-process σφάλματα που πρέπει να φτάσουν στο renderer με συγκεκριμένο
// ERROR_CODE διασχίζουν το IPC boundary σαν απλά Error objects (η Electron
// δεν διατηρεί custom classes πέρα από το message). Σύμβαση: το main
// process πετάει Error('CODE:φιλικό μήνυμα'), και εδώ το ξαναφτιάχνουμε σε
// AppError. Καλείται στα services μετά από κάθε window.api κλήση που
// μπορεί να πετάξει κωδικοποιημένο σφάλμα (π.χ. VALIDATION_ERROR, BOOKING_CONFLICT).
export const rethrowIpcError = (err) => {
    const match = /([A-Z][A-Z_]*):([^\n]*)/.exec(err.message)
    if (match && ERROR_CODES[match[1]]) {
        throw new AppError(ERROR_CODES[match[1]], match[2].trim())
    }
    throw err
}

// Μετατρέπει error σε human-readable μήνυμα για τον χρήστη
export const getErrorMessage = (err) => {
    if (err instanceof AppError) {
        switch (err.code) {
            case ERROR_CODES.DB_NOT_FOUND:
                return 'Το στοιχείο δεν βρέθηκε'
            case ERROR_CODES.DB_DUPLICATE:
                return 'Υπάρχει ήδη εγγραφή με αυτά τα στοιχεία'
            case ERROR_CODES.BOOKING_CONFLICT:
                return 'Το δωμάτιο δεν είναι διαθέσιμο για αυτές τις ημερομηνίες'
            case ERROR_CODES.ROOM_UNAVAILABLE:
                return 'Το δωμάτιο δεν είναι διαθέσιμο'
            case ERROR_CODES.VALIDATION_ERROR:
                return err.message
            default:
                return 'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.'
        }
    }
    return 'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.'
}
