import Card from '@components/Card/Card'
import RevenueChart from './components/RevenueChart'
import OccupancyChart from './components/OccupancyChart'
import SourceChart from './components/SourceChart'
import useReports from '@hooks/useReports'
import './Reports.css'

function Reports() {
    const {
        revenueByMonth,
        occupancyByRoom,
        bookingsBySource,
        totalRevenue,
        totalBookings,
        avgNights,
        currentMonthData,
    } = useReports()

    return (
        <div className="reports">

            {/* Σύνοψη */}
            <div className="reports__stats">
                <Card>
                    <div className="reports__stat">
                        <span className="reports__stat-value">{totalRevenue}€</span>
                        <span className="reports__stat-label">Συνολικά Έσοδα</span>
                        <span className="reports__stat-sub">Τρέχον έτος</span>
                    </div>
                </Card>
                <Card>
                    <div className="reports__stat">
                        <span className="reports__stat-value">{totalBookings}</span>
                        <span className="reports__stat-label">Συνολικές Κρατήσεις</span>
                        <span className="reports__stat-sub">Τρέχον έτος</span>
                    </div>
                </Card>
                <Card>
                    <div className="reports__stat">
                        <span className="reports__stat-value">{avgNights}</span>
                        <span className="reports__stat-label">Μέση Διαμονή</span>
                        <span className="reports__stat-sub">Νύχτες ανά κράτηση</span>
                    </div>
                </Card>
                <Card>
                    <div className="reports__stat">
                        <span className="reports__stat-value">{currentMonthData?.revenue || 0}€</span>
                        <span className="reports__stat-label">Έσοδα Μήνα</span>
                        <span className="reports__stat-sub">
              {new Date().toLocaleDateString('el-GR', { month: 'long', year: 'numeric' })}
            </span>
                    </div>
                </Card>
            </div>

            {/* Έσοδα ανά μήνα */}
            <Card title="Έσοδα ανά Μήνα">
                <RevenueChart data={revenueByMonth} />
            </Card>

            {/* Πληρότητα & Προέλευση */}
            <div className="reports__charts">
                <Card title="Διανυκτερεύσεις ανά Δωμάτιο">
                    <OccupancyChart data={occupancyByRoom} />
                </Card>
                <Card title="Κρατήσεις ανά Προέλευση">
                    <SourceChart data={bookingsBySource} />
                </Card>
            </div>

        </div>
    )
}

export default Reports