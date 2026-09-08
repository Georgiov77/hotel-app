import useAsyncResource from './useAsyncResource'
import roomService from '@services/roomService'
import bookingService from '@services/bookingService'

function useCalendarData(startDate, endDate) {
    const { data, isLoading, reload } = useAsyncResource(
        async () => {
            const [rooms, bookings] = await Promise.all([
                roomService.getAll(),
                bookingService.getByDateRange(startDate, endDate),
            ])
            return { rooms, bookings }
        },
        [startDate, endDate],
        { rooms: [], bookings: [] },
        { enabled: Boolean(startDate && endDate) }
    )

    return { rooms: data.rooms, bookings: data.bookings, isLoading, reload }
}

export default useCalendarData
