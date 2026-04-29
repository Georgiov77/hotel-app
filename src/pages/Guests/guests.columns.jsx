import './Guests.css'

const guestColumns = [
    {
        key: 'lastName',
        label: 'Πελάτης',
        render: (row) => (
            <div className="guests__name">
                <span className="guests__name-full">{row.lastName} {row.firstName}</span>
                <span className="guests__name-email">{row.email}</span>
            </div>
        ),
    },
    { key: 'phone',       label: 'Τηλέφωνο' },
    { key: 'nationality', label: 'Υπηκοότητα' },
    { key: 'idNumber',    label: 'ΑΔΤ / Διαβατήριο' },
    { key: 'notes',       label: 'Σημειώσεις', render: (row) => row.notes || '—' },
]

export default guestColumns