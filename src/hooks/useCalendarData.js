import { useState, useEffect } from 'react'
import roomService         from '@services/roomService'
import bookingService      from '@services/bookingService'
import { toast }           from '@stores/useToastStore'
import { getErrorMessage } from '@error/errorHandler'

function useCalendarData(startDate, endDate) {
    const [rooms,     setRooms]     = useState([])
    const [bookings,  setBookings]  = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const load = async () => {
        try {
            setIsLoading(true)
            const [roomData, bookingData] = await Promise.all([
                roomService.getAll(),
                bookingService.getByDateRange(startDate, endDate),
            ])
            setRooms(roomData)
            setBookings(bookingData)
        } catch (err) {
            toast.error(getErrorMessage(err))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (startDate && endDate) load()
    }, [startDate, endDate])

    return { rooms, bookings, isLoading, reload: load }
}

export default useCalendarData