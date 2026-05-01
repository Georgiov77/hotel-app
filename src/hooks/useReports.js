// src/hooks/useReports.js
import { mockBookings } from '@config/mockData'
import { BOOKING_SOURCE_LABEL } from '@config/statuses'

function useReports() {
    const currentYear  = new Date().getFullYear()
    const currentMonth = new Date().getMonth()

    // Έσοδα ανά μήνα
    const revenueByMonth = Array.from({ length: 12 }, (_, i) => {
        const monthBookings = mockBookings.filter((b) => {
            const date = new Date(b.checkIn)
            return date.getFullYear() === currentYear &&
                date.getMonth() === i &&
                b.status !== 'cancelled'
        })
        const revenue = monthBookings.reduce((sum, b) => sum + b.totalAmount, 0)
        return {
            month: new Date(currentYear, i).toLocaleDateString('el-GR', { month: 'short' }),
            revenue,
            bookings: monthBookings.length,
        }
    })

    // Πληρότητα ανά δωμάτιο
    const occupancyByRoom = (() => {
        const roomMap = {}
        mockBookings
            .filter((b) => b.status !== 'cancelled')
            .forEach((b) => {
                if (!roomMap[b.roomNumber]) {
                    roomMap[b.roomNumber] = { room: `Νο. ${b.roomNumber}`, nights: 0, revenue: 0 }
                }
                roomMap[b.roomNumber].nights  += b.nights
                roomMap[b.roomNumber].revenue += b.totalAmount
            })
        return Object.values(roomMap).sort((a, b) => a.room.localeCompare(b.room))
    })()

    // Κρατήσεις ανά προέλευση
    const bookingsBySource = (() => {
        const sourceMap = {}
        mockBookings
            .filter((b) => b.status !== 'cancelled')
            .forEach((b) => {
                if (!sourceMap[b.source]) {
                    sourceMap[b.source] = { name: BOOKING_SOURCE_LABEL[b.source], value: 0 }
                }
                sourceMap[b.source].value++
            })
        return Object.values(sourceMap)
    })()

    // Σύνοψη τρέχοντος μήνα
    const currentMonthData = revenueByMonth[currentMonth]
    const totalRevenue     = revenueByMonth.reduce((sum, m) => sum + m.revenue, 0)
    const totalBookings    = mockBookings.filter((b) => b.status !== 'cancelled').length
    const avgNights        = mockBookings
        .filter((b) => b.status !== 'cancelled')
        .reduce((sum, b) => sum + b.nights, 0) / totalBookings || 0

    return {
        revenueByMonth,
        occupancyByRoom,
        bookingsBySource,
        currentMonthData,
        totalRevenue,
        totalBookings,
        avgNights: avgNights.toFixed(1),
    }
}

export default useReports