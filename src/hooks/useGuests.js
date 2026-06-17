import { useState, useEffect } from 'react'
import { useToast }        from '@georgevlachos/ui'
import guestService        from '@services/guestService'
import { getErrorMessage } from '@error/errorHandler'

function useGuests() {
    const { showToast } = useToast()

    const [guests,    setGuests]    = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const load = async () => {
        try {
            setIsLoading(true)
            const data = await guestService.getAll()
            setGuests(data)
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        } finally {
            setIsLoading(false)
        }
    }

    const search = async (query) => {
        try {
            if (!query) return load()
            const data = await guestService.search(query)
            setGuests(data)
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const create = async (guest) => {
        try {
            await guestService.create(guest)
            showToast({ message: 'Ο πελάτης αποθηκεύτηκε!', variant: 'success' })
            await load()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const update = async (id, guest) => {
        try {
            await guestService.update(id, guest)
            showToast({ message: 'Ο πελάτης ενημερώθηκε!', variant: 'success' })
            await load()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const remove = async (id) => {
        try {
            await guestService.delete(id)
            showToast({ message: 'Ο πελάτης διαγράφηκε!', variant: 'success' })
            await load()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    useEffect(() => { load() }, [])

    return { guests, isLoading, search, create, update, remove, reload: load }
}

export default useGuests