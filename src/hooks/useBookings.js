import { useToast } from '@georgevlachos/ui'
import useAsyncResource from './useAsyncResource'
import bookingService from '@services/bookingService'
import { getErrorMessage } from '@error/errorHandler'

function useBookings() {
    const { showToast } = useToast()

    const {
        data: bookings,
        isLoading,
        reload,
    } = useAsyncResource(() => bookingService.getAll(), [], [])

    const updateStatus = async (id, status) => {
        try {
            await bookingService.updateStatus(id, status)
            showToast({ message: 'Η κατάσταση ενημερώθηκε!', variant: 'success' })
            await reload()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const remove = async (id) => {
        try {
            await bookingService.delete(id)
            showToast({ message: 'Η κράτηση ακυρώθηκε!', variant: 'success' })
            await reload()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    return { bookings, isLoading, updateStatus, remove, reload }
}

export default useBookings
