import { useToast, Badge, Card, Button, Grid, Stack, Table } from '@georgevlachos/ui'
import useDashboard    from '@hooks/useDashboard'
import bookingService  from '@services/bookingService'
import { getErrorMessage } from '@error/errorHandler'
import { BOOKING_STATUS_VARIANT, BOOKING_STATUS_LABEL } from '@config/statuses'
import './Dashboard.css'

function Dashboard({ onNavigate }) {
    const { showToast } = useToast()
    const { checkIns, checkOuts, isLoading, stats, reload } = useDashboard()

    const handleCheckIn = async (id) => {
        try {
            await bookingService.updateStatus(id, 'checked_in')
            showToast({ message: 'Check-in ολοκληρώθηκε!', variant: 'success' })
            reload()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const handleCheckOut = async (id) => {
        try {
            await bookingService.updateStatus(id, 'checked_out')
            showToast({ message: 'Check-out ολοκληρώθηκε!', variant: 'success' })
            reload()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    const checkInColumns = [
        { key: 'guest',    label: 'Πελάτης',    render: (b) => `${b.last_name} ${b.first_name}` },
        { key: 'room',     label: 'Δωμάτιο',    render: (b) => `Νο. ${b.room_number}` },
        { key: 'nights',   label: 'Νύχτες' },
        { key: 'status',   label: 'Κατάσταση',  render: (b) => (
                <Badge label={BOOKING_STATUS_LABEL[b.status]} variant={BOOKING_STATUS_VARIANT[b.status]} />
            )},
        { key: 'action',   label: '',            render: (b) => b.status === 'confirmed' ? (
                <Button size="sm" onClick={() => handleCheckIn(b.id)}>Check-in</Button>
            ) : null },
    ]

    const checkOutColumns = [
        { key: 'guest',    label: 'Πελάτης',    render: (b) => `${b.last_name} ${b.first_name}` },
        { key: 'room',     label: 'Δωμάτιο',    render: (b) => `Νο. ${b.room_number}` },
        { key: 'total',    label: 'Σύνολο',      render: (b) => `${b.total_amount}€` },
        { key: 'status',   label: 'Κατάσταση',  render: (b) => (
                <Badge label={BOOKING_STATUS_LABEL[b.status]} variant={BOOKING_STATUS_VARIANT[b.status]} />
            )},
        { key: 'action',   label: '',            render: (b) => b.status === 'checked_in' ? (
                <Button size="sm" variant="secondary" onClick={() => handleCheckOut(b.id)}>Check-out</Button>
            ) : null },
    ]

    if (isLoading) return <div className="dashboard__loading">Φόρτωση...</div>

    return (
        <Stack gap="lg" className="dashboard">

            {/* Stats */}
            <Grid columns={4} gap="md">
                <Card>
                    <div className="dashboard__stat">
                        <span className="dashboard__stat-value">{stats.checkInsToday}</span>
                        <span className="dashboard__stat-label">Check-in σήμερα</span>
                        <span className="dashboard__stat-sub">Αναμένονται</span>
                    </div>
                </Card>
                <Card>
                    <div className="dashboard__stat">
                        <span className="dashboard__stat-value">{stats.checkOutsToday}</span>
                        <span className="dashboard__stat-label">Check-out σήμερα</span>
                        <span className="dashboard__stat-sub">Αναμένονται</span>
                    </div>
                </Card>
                <Card>
                    <div className="dashboard__stat">
                        <span className="dashboard__stat-value">{stats.occupancyPct}%</span>
                        <span className="dashboard__stat-label">Πληρότητα</span>
                        <span className="dashboard__stat-sub">{stats.checkInsToday} / 13 δωμάτια</span>
                    </div>
                </Card>
                <Card>
                    <div className="dashboard__stat">
                        <span className="dashboard__stat-value">{stats.monthRevenue}€</span>
                        <span className="dashboard__stat-label">Έσοδα μήνα</span>
                        <span className="dashboard__stat-sub">
                            {new Date().toLocaleDateString('el-GR', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                </Card>
            </Grid>

            {/* Lists */}
            <Grid columns={2} gap="md">
                <Card
                    title="Check-in σήμερα"
                    padding="sm"
                    actions={<Button size="sm" onClick={() => onNavigate('new-booking')}>+ Νέα</Button>}
                >
                    <Table
                        columns={checkInColumns}
                        data={checkIns}
                        emptyMessage="Δεν υπάρχουν check-in σήμερα"
                    />
                </Card>

                <Card title="Check-out σήμερα" padding="sm">
                    <Table
                        columns={checkOutColumns}
                        data={checkOuts}
                        emptyMessage="Δεν υπάρχουν check-out σήμερα"
                    />
                </Card>
            </Grid>

        </Stack>
    )
}

export default Dashboard