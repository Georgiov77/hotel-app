import Card            from '@components/Card/Card'
import Button          from '@components/Button/Button'
import Badge           from '@components/Badge/Badge'
import useDashboard    from '@hooks/useDashboard'
import bookingService  from '@services/bookingService'
import { toast }       from '@stores/useToastStore'
import { getErrorMessage } from '@error/errorHandler'
import { BOOKING_STATUS_VARIANT, BOOKING_STATUS_LABEL } from '@config/statuses'
import './Dashboard.css'

function Dashboard({ onNavigate }) {
    const { checkIns, checkOuts, isLoading, stats, reload } = useDashboard()

    const handleCheckIn = async (id) => {
        try {
            await bookingService.updateStatus(id, 'checked_in')
            toast.success('Check-in ολοκληρώθηκε!')
            reload()
        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    const handleCheckOut = async (id) => {
        try {
            await bookingService.updateStatus(id, 'checked_out')
            toast.success('Check-out ολοκληρώθηκε!')
            reload()
        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    if (isLoading) return <div className="dashboard__loading">Φόρτωση...</div>

    return (
        <div className="dashboard">
            <div className="dashboard__stats">
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
            </div>

            <div className="dashboard__lists">
                <Card
                    title="Check-in σήμερα"
                    actions={<Button size="sm" onClick={() => onNavigate('new-booking')}>+ Νέα</Button>}
                >
                    <table className="dashboard__table">
                        <thead>
                        <tr>
                            <th>Πελάτης</th>
                            <th>Δωμάτιο</th>
                            <th>Νύχτες</th>
                            <th>Κατάσταση</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {checkIns.length ? checkIns.map((b) => (
                            <tr key={b.id}>
                                <td>{b.last_name} {b.first_name}</td>
                                <td>Νο. {b.room_number}</td>
                                <td>{b.nights}</td>
                                <td>
                                    <Badge variant={BOOKING_STATUS_VARIANT[b.status]}>
                                        {BOOKING_STATUS_LABEL[b.status]}
                                    </Badge>
                                </td>
                                <td>
                                    {b.status === 'confirmed' && (
                                        <Button size="sm" onClick={() => handleCheckIn(b.id)}>
                                            Check-in
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="dashboard__empty">
                                    Δεν υπάρχουν check-in σήμερα
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </Card>

                <Card title="Check-out σήμερα">
                    <table className="dashboard__table">
                        <thead>
                        <tr>
                            <th>Πελάτης</th>
                            <th>Δωμάτιο</th>
                            <th>Σύνολο</th>
                            <th>Κατάσταση</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {checkOuts.length ? checkOuts.map((b) => (
                            <tr key={b.id}>
                                <td>{b.last_name} {b.first_name}</td>
                                <td>Νο. {b.room_number}</td>
                                <td>{b.total_amount}€</td>
                                <td>
                                    <Badge variant={BOOKING_STATUS_VARIANT[b.status]}>
                                        {BOOKING_STATUS_LABEL[b.status]}
                                    </Badge>
                                </td>
                                <td>
                                    {b.status === 'checked_in' && (
                                        <Button size="sm" variant="secondary" onClick={() => handleCheckOut(b.id)}>
                                            Check-out
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="dashboard__empty">
                                    Δεν υπάρχουν check-out σήμερα
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard