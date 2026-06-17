import { useState }      from 'react'
import { Card, Button, Modal } from '@georgevlachos/ui'
import Table             from '@components/Table/Table'
import EditGuestModal    from './EditGuestModal'
import useGuests         from '@hooks/useGuests'
import guestColumns      from './guests.columns'
import './Guests.css'

function Guests() {
    const { guests, isLoading, search, remove, reload } = useGuests()
    const [query,         setQuery]         = useState('')
    const [editingGuest,  setEditingGuest]  = useState(null)
    const [selectedGuest, setSelectedGuest] = useState(null)

    const handleSearch = (e) => {
        setQuery(e.target.value)
        search(e.target.value)
    }

    if (isLoading) return <div>Φόρτωση...</div>

    return (
        <div className="guests">
            <div className="guests__toolbar">
                <div className="guests__search">
                    🔍
                    <input
                        type="text"
                        placeholder="Αναζήτηση πελάτη..."
                        value={query}
                        onChange={handleSearch}
                    />
                </div>
                <Button onClick={() => setEditingGuest({})}>+ Νέος Πελάτης</Button>
            </div>

            <Card>
                <Table
                    columns={guestColumns}
                    data={guests}
                    onRowClick={setSelectedGuest}
                    emptyMessage="Δεν βρέθηκαν πελάτες"
                />
            </Card>

            {/* Guest Detail Modal */}
            <Modal
                isOpen={!!selectedGuest}
                onClose={() => setSelectedGuest(null)}
                title={selectedGuest ? `${selectedGuest.last_name} ${selectedGuest.first_name}` : ''}
                size="md"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setSelectedGuest(null)}>
                            Κλείσιμο
                        </Button>
                        <Button variant="danger" onClick={() => {
                            remove(selectedGuest.id)
                            setSelectedGuest(null)
                        }}>
                            Διαγραφή
                        </Button>
                        <Button onClick={() => {
                            setEditingGuest(selectedGuest)
                            setSelectedGuest(null)
                        }}>
                            Επεξεργασία
                        </Button>
                    </>
                }
            >
                {selectedGuest && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        <div><strong>Email:</strong> {selectedGuest.email || '—'}</div>
                        <div><strong>Τηλέφωνο:</strong> {selectedGuest.phone || '—'}</div>
                        <div><strong>Υπηκοότητα:</strong> {selectedGuest.nationality}</div>
                        <div><strong>ΑΔΤ/Διαβατήριο:</strong> {selectedGuest.id_number || '—'}</div>
                        <div><strong>Σημειώσεις:</strong> {selectedGuest.notes || '—'}</div>
                    </div>
                )}
            </Modal>

            {/* Edit Guest Modal */}
            <Modal
                isOpen={!!editingGuest}
                onClose={() => setEditingGuest(null)}
                title={editingGuest?.id ? 'Επεξεργασία Πελάτη' : 'Νέος Πελάτης'}
                size="md"
            >
                {editingGuest !== null && (
                    <EditGuestModal
                        guest={editingGuest}
                        onSave={() => {
                            setEditingGuest(null)
                            reload()
                        }}
                        onClose={() => setEditingGuest(null)}
                    />
                )}
            </Modal>
        </div>
    )
}

export default Guests