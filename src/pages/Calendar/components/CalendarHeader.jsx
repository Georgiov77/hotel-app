import Button from '@components/Button/Button'
import './CalendarHeader.css'

function CalendarHeader({ days, onPrev, onNext, onToday, onNewBooking }) {
    const start = new Date(days[0])
    const end   = new Date(days[days.length - 1])

    const formatTitle = () => {
        const startLabel = start.toLocaleDateString('el-GR', { day: 'numeric', month: 'long' })
        const endLabel   = end.toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' })
        return `${startLabel} — ${endLabel}`
    }

    return (
        <div className="calendar-header">
            <div className="calendar-header__nav">
                <Button variant="secondary" size="sm" onClick={onPrev}>←</Button>
                <span className="calendar-header__title">{formatTitle()}</span>
                <Button variant="secondary" size="sm" onClick={onNext}>→</Button>
            </div>
            <div className="calendar-header__actions">
                <Button variant="secondary" size="sm" onClick={onToday}>Σήμερα</Button>
                <Button size="sm" onClick={onNewBooking}>+ Νέα Κράτηση</Button>
            </div>
        </div>
    )
}

export default CalendarHeader