import './Table.css'

function Table({ columns, data, onRowClick, emptyMessage = 'Δεν βρέθηκαν αποτελέσματα' }) {
    return (
        <table className={`table ${onRowClick ? 'table--clickable' : ''}`}>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.key} style={col.width ? { width: col.width } : {}}>
                        {col.label}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.length ? data.map((row) => (
                <tr key={row.id} onClick={() => onRowClick?.(row)}>
                    {columns.map((col) => (
                        <td key={col.key}>
                            {col.render ? col.render(row) : row[col.key]}
                        </td>
                    ))}
                </tr>
            )) : (
                <tr>
                    <td colSpan={columns.length} className="table__empty">
                        {emptyMessage}
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default Table