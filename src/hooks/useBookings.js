import { useState, useEffect } from 'react'
import bookingService      from '@services/bookingService'
import { toast }           from '@stores/useToastStore'
import { getErrorMessage } from '@error/errorHandler'

function useBookings() {
    const [bookings,  setBookings]  = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const load = async () => {
        try {
            setIsLoading(true)
            const data = await bookingService.getAll()
            setBookings(data)
        } catch (err) {
            toast.error(getErrorMessage(err))
        } finally {
            setIsLoading(false)
        }
    }

    const updateStatus = async (id, status) => {
        try {
            await bookingService.updateStatus(id, status)
            toast.success('Η κατάσταση ενημερώθηκε!')
            await load()
        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    const remove = async (id) => {
        try {
            await bookingService.delete(id)
            toast.success('Η κράτηση ακυρώθηκε!')
            await load()
        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    useEffect(() => { load() }, [])

    return { bookings, isLoading, updateStatus, remove, reload: load }
}

export default useBookings