import { useState, useEffect } from 'react'
import { useToast }            from '@georgevlachos/ui'
import bookingService          from '@services/bookingService'
import { getErrorMessage }     from '@error/errorHandler'

function useBookings() {
    const { showToast } = useToast()

    const [bookings,  setBookings]  = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const load = async () => {
        try {
            setIsLoading(true)
            const data = await bookingService.getAll()
            setBookings(data)
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        } finally {
            setIsLoading(false)
        }
    }

    const updateStatus = async (id, status) => {
        try {
            await bookingService.updateStatus(id, status)
            showToast({ message: 'Η κατάσταση ενημερώθηκε!', variant: 'success' })
            await load()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const remove = async (id) => {
        try {
            await bookingService.delete(id)
            showToast({ message: 'Η κράτηση ακυρώθηκε!', variant: 'success' })
            await load()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    useEffect(() => { load() }, [])

    return { bookings, isLoading, updateStatus, remove, reload: load }
}

export default useBookings