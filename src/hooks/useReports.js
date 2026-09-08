// src/hooks/useReports.js
import useAsyncResource from './useAsyncResource'
import bookingService from '@services/bookingService'
import { BOOKING_SOURCE_LABEL } from '@config/statuses'

function useReports() {
    const { data: bookings, isLoading } = useAsyncResource(
        async () => (await bookingService.getAll()).filter((b) => b.status !== 'cancelled'),
        [],
        []
    )

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()

    const revenueByMonth = Array.from({ length: 12 }, (_, i) => {
        const monthBookings = bookings.filter((b) => {
            const date = new Date(b.checkIn)
            return date.getFullYear() === currentYear && date.getMonth() === i
        })
        return {
            month: new Date(currentYear, i).toLocaleDateString('el-GR', { month: 'short' }),
            revenue: monthBookings.reduce((sum, b) => sum + b.totalAmount, 0),
            bookings: monthBookings.length,
        }
    })

    const occupancyByRoom = (() => {
        const roomMap = {}
        bookings.forEach((b) => {
            const key = `Νο. ${b.roomNumber}`
            if (!roomMap[key]) roomMap[key] = { room: key, nights: 0, revenue: 0 }
            roomMap[key].nights += b.nights
            roomMap[key].revenue += b.totalAmount
        })
        return Object.values(roomMap).sort((a, b) => a.room.localeCompare(b.room))
    })()

    const bookingsBySource = (() => {
        const sourceMap = {}
        bookings.forEach((b) => {
            if (!sourceMap[b.source]) {
                sourceMap[b.source] = { name: BOOKING_SOURCE_LABEL[b.source], value: 0 }
            }
            sourceMap[b.source].value++
        })
        return Object.values(sourceMap)
    })()

    const currentMonthData = revenueByMonth[currentMonth]
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0)
    const totalBookings = bookings.length
    const avgNights = totalBookings
        ? (bookings.reduce((sum, b) => sum + b.nights, 0) / totalBookings).toFixed(1)
        : 0

    return {
        isLoading,
        revenueByMonth,
        occupancyByRoom,
        bookingsBySource,
        currentMonthData,
        totalRevenue,
        totalBookings,
        avgNights,
    }
}

export default useReports
