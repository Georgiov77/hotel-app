import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts'
import './OccupancyChart.css'

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div className="occupancy-chart__tooltip">
            <div className="occupancy-chart__tooltip-label">{label}</div>
            <div className="occupancy-chart__tooltip-value">{payload[0].value} νύχτες</div>
        </div>
    )
}

function OccupancyChart({ data }) {
    return (
        <div className="occupancy-chart">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis
                        dataKey="room"
                        tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                        axisLine={{ stroke: 'var(--color-border)' }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}ν`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="nights" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default OccupancyChart