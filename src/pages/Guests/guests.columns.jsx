import './Guests.css'

const guestColumns = [
    {
        key: 'last_name',
        label: 'Πελάτης',
        render: (row) => (
            <div className="guests__name">
                <span className="guests__name-full">{row.last_name} {row.first_name}</span>
                <span className="guests__name-email">{row.email}</span>
            </div>
        ),
    },
    { key: 'phone',       label: 'Τηλέφωνο' },
    { key: 'nationality', label: 'Υπηκοότητα' },
    { key: 'id_number',   label: 'ΑΔΤ / Διαβατήριο' },
    { key: 'notes',       label: 'Σημειώσεις', render: (row) => row.notes || '—' },
]

export default guestColumns