import {
    PieChart, Pie, Cell, Tooltip,
    Legend, ResponsiveContainer
} from 'recharts'
import './SourceChart.css'

const COLORS = [
    'var(--color-primary)',
    'var(--color-success)',
    'var(--color-warning)',
    'var(--color-info)',
]

function CustomTooltip({ active, payload }) {
    if (!active || !payload?.length) return null
    return (
        <div className="source-chart__tooltip">
            <div className="source-chart__tooltip-label">{payload[0].name}</div>
            <div className="source-chart__tooltip-value">{payload[0].value} κρατήσεις</div>
        </div>
    )
}

function SourceChart({ data }) {
    return (
        <div className="source-chart">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={4}
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        formatter={(value) => (
                            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {value}
              </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SourceChart