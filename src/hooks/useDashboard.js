// src/hooks/useDashboard.js
import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@georgevlachos/ui'
import bookingService from '@services/bookingService'
import roomService from '@services/roomService'
import { getErrorMessage } from '@error/errorHandler'

function useDashboard() {
    const { showToast } = useToast()

    const [checkIns, setCheckIns] = useState([])
    const [checkOuts, setCheckOuts] = useState([])
    const [totalRooms, setTotalRooms] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const load = useCallback(async () => {
        try {
            setIsLoading(true)
            const [ins, outs, rooms] = await Promise.all([
                bookingService.getTodayCheckIns(),
                bookingService.getTodayCheckOuts(),
                roomService.getAll(),
            ])
            setCheckIns(ins)
            setCheckOuts(outs)
            setTotalRooms(rooms.length)
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        } finally {
            setIsLoading(false)
        }
    }, [showToast])

    useEffect(() => {
        load()
    }, [load])

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
        reload: load,
    }
}

export default useDashboard
