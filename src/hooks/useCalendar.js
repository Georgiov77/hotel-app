import { useState } from 'react'
import { todayISO } from '@georgevlachos/utils'

const DAYS_TO_SHOW = 7

function useCalendar() {
    const [startDate, setStartDate] = useState(todayISO())

    const getDaysArray = () => {
        const days = []
        const start = new Date(startDate)
        for (let i = 0; i < DAYS_TO_SHOW; i++) {
            const d = new Date(start)
            d.setDate(d.getDate() + i)
            days.push(d.toISOString().split('T')[0])
        }
        return days
    }

    const goNext = () => {
        const d = new Date(startDate)
        d.setDate(d.getDate() + DAYS_TO_SHOW)
        setStartDate(d.toISOString().split('T')[0])
    }

    const goPrev = () => {
        const d = new Date(startDate)
        d.setDate(d.getDate() - DAYS_TO_SHOW)
        setStartDate(d.toISOString().split('T')[0])
    }

    const goToday = () => setStartDate(todayISO())

    const isToday = (dateStr) => dateStr === todayISO()

    const days = getDaysArray()
    const endDate = days[days.length - 1]

    return {
        days,
        startDate,
        endDate,
        goNext,
        goPrev,
        goToday,
        isToday,
    }
}

export default useCalendar