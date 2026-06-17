import {Button, Grid, Row} from '@georgevlachos/ui'
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
        <Grid columns='2' className="calendar-header">
            <Row gap="sm" align="center" justify="center">
                <Button variant="secondary" size="sm" onClick={onPrev}>←</Button>
                <span className="calendar-header__title">{formatTitle()}</span>
                <Button variant="secondary" size="sm" onClick={onNext}>→</Button>
            </Row>
            <Row gap="sm" align="center" justify="end">
                <Button variant="secondary" size="sm" onClick={onToday}>Σήμερα</Button>
                <Button size="sm" onClick={onNewBooking}>+ Νέα Κράτηση</Button>
            </Row>
        </Grid>
    )
}

export default CalendarHeader