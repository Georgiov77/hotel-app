import { useState, useEffect } from 'react'
import guestService        from '@services/guestService'
import { toast }           from '@stores/useToastStore'
import { getErrorMessage } from '@error/errorHandler'

function useGuests() {
    const [guests,    setGuests]    = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const load = async () => {
        try {
            setIsLoading(true)
            const data = await guestService.getAll()
            setGuests(data)
        } catch (err) {
            toast.error(getErrorMessage(err))
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
            toast.error(getErrorMessage(err))
        }
    }

    const create = async (guest) => {
        try {
            await guestService.create(guest)
            toast.success('Ο πελάτης αποθηκεύτηκε!')
            await load()
        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    const update = async (id, guest) => {
        try {
            await guestService.update(id, guest)
            toast.success('Ο πελάτης ενημερώθηκε!')
            await load()
        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    const remove = async (id) => {
        try {
            await guestService.delete(id)
            toast.success('Ο πελάτης διαγράφηκε!')
            await load()
        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    useEffect(() => { load() }, [])

    return { guests, isLoading, search, create, update, remove, reload: load }
}

export default useGuests