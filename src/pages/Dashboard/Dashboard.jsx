import Card from '@components/Card/Card'
import { mockStats, mockCheckIns, mockCheckOuts } from '@config/mockData'
import './Dashboard.css'

function Dashboard() {
    const { checkInsToday, checkOutsToday, occupancy, monthRevenue } = mockStats

    return (
        <div className="dashboard">

            <div className="dashboard__stats">
                <Card>
                    <div className="dashboard__stat">
                        <span className="dashboard__stat-value">{checkInsToday}</span>
                        <span className="dashboard__stat-label">Check-in σήμερα</span>
                        <span className="dashboard__stat-sub">Αναμένονται</span>
                    </div>
                </Card>
                <Card>
                    <div className="dashboard__stat">
                        <span className="dashboard__stat-value">{checkOutsToday}</span>
                        <span className="dashboard__stat-label">Check-out σήμερα</span>
                        <span className="dashboard__stat-sub">Αναμένονται</span>
                    </div>
                </Card>
                <Card>
                    <div className="dashboard__stat">
            <span className="dashboard__stat-value">
              {Math.round((occupancy.occupied / occupancy.total) * 100)}%
            </span>
                        <span className="dashboard__stat-label">Πληρότητα</span>
                        <span className="dashboard__stat-sub">
              {occupancy.occupied} / {occupancy.total} δωμάτια
            </span>
                    </div>
                </Card>
                <Card>
                    <div className="dashboard__stat">
                        <span className="dashboard__stat-value">{monthRevenue}€</span>
                        <span className="dashboard__stat-label">Έσοδα μήνα</span>
                        <span className="dashboard__stat-sub">Τρέχων μήνας</span>
                    </div>
                </Card>
            </div>

            <div className="dashboard__lists">
                <Card title="Check-in σήμερα">
                    <table className="dashboard__table">
                        <thead>
                        <tr>
                            <th>Πελάτης</th>
                            <th>Δωμάτιο</th>
                            <th>Νύχτες</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mockCheckIns.length ? mockCheckIns.map((b) => (
                            <tr key={b.id}>
                                <td>{b.guestName}</td>
                                <td>{b.room}</td>
                                <td>{b.nights}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="dashboard__empty">
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
                        </tr>
                        </thead>
                        <tbody>
                        {mockCheckOuts.length ? mockCheckOuts.map((b) => (
                            <tr key={b.id}>
                                <td>{b.guestName}</td>
                                <td>{b.room}</td>
                                <td>{b.total}€</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="dashboard__empty">
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