// src/hooks/useDashboard.js
import { useState, useEffect } from 'react'
import bookingService from '@services/bookingService'
import { getErrorMessage } from '@error/errorHandler'
import { toast } from '@stores/useToastStore'

function useDashboard() {
    const [checkIns,   setCheckIns]   = useState([])
    const [checkOuts,  setCheckOuts]  = useState([])
    const [isLoading,  setIsLoading]  = useState(true)

    const load = async () => {
        try {
            setIsLoading(true)
            const [ins, outs] = await Promise.all([
                bookingService.getTodayCheckIns(),
                bookingService.getTodayCheckOuts(),
            ])
            setCheckIns(ins)
            setCheckOuts(outs)
        } catch (err) {
            toast.error(getErrorMessage(err))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const totalRooms  = 13
    const occupied    = checkIns.filter((b) => b.status === 'checked_in').length
    const occupancyPct = Math.round((occupied / totalRooms) * 100)
    const monthRevenue = checkIns.reduce((sum, b) => sum + b.total_amount, 0)

    return {
        checkIns,
        checkOuts,
        isLoading,
        stats: {
            checkInsToday:  checkIns.length,
            checkOutsToday: checkOuts.length,
            occupancyPct,
            monthRevenue,
        },
        reload: load,
    }
}

export default useDashboard