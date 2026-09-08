import useAsyncResource from './useAsyncResource'
import bookingService from '@services/bookingService'
import roomService from '@services/roomService'

function useDashboard() {
    const { data, isLoading, reload } = useAsyncResource(
        async () => {
            const [checkIns, checkOuts, rooms] = await Promise.all([
                bookingService.getTodayCheckIns(),
                bookingService.getTodayCheckOuts(),
                roomService.getAll(),
            ])
            return { checkIns, checkOuts, totalRooms: rooms.length }
        },
        [],
        { checkIns: [], checkOuts: [], totalRooms: 0 }
    )

    const { checkIns, checkOuts, totalRooms } = data
    const occupied = checkIns.filter((b) => b.status === 'checked_in').length
    const occupancyPct = totalRooms ? Math.round((occupied / totalRooms) * 100) : 0
    const monthRevenue = checkIns.reduce((sum, b) => sum + b.totalAmount, 0)

    return {
        checkIns,
        checkOuts,
        isLoading,
        stats: {
            checkInsToday: checkIns.length,
            checkOutsToday: checkOuts.length,
            occupancyPct,
            monthRevenue,
            totalRooms,
        },
        reload,
    }
}

export default useDashboard
