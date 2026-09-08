import { useToast } from '@georgevlachos/ui'
import useAsyncResource from './useAsyncResource'
import guestService from '@services/guestService'
import { getErrorMessage } from '@error/errorHandler'

function useGuests() {
    const { showToast } = useToast()

    const {
        data: guests,
        isLoading,
        reload,
        setData: setGuests,
    } = useAsyncResource(() => guestService.getAll(), [], [])

    const search = async (query) => {
        try {
            if (!query) return reload()
            setGuests(await guestService.search(query))
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const create = async (guest) => {
        try {
            await guestService.create(guest)
            showToast({ message: 'Ο πελάτης αποθηκεύτηκε!', variant: 'success' })
            await reload()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const update = async (id, guest) => {
        try {
            await guestService.update(id, guest)
            showToast({ message: 'Ο πελάτης ενημερώθηκε!', variant: 'success' })
            await reload()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const remove = async (id) => {
        try {
            await guestService.delete(id)
            showToast({ message: 'Ο πελάτης διαγράφηκε!', variant: 'success' })
            await reload()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    return { guests, isLoading, search, create, update, remove, reload }
}

export default useGuests
