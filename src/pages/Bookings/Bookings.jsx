import { useState }          from 'react'
import { Card, Button, Modal, Table, Input, Stack, Row, Spinner, Select } from '@georgevlachos/ui'
import BookingDetail         from './BookingDetail'
import EditBookingModal      from './EditBookingModal'
import useBookings           from '@hooks/useBookings'
import useSearch             from '@hooks/useSearch'
import bookingColumns        from './bookings.columns'
import './Bookings.css'

const statusOptions = [
    { value: 'all',        label: 'Όλες οι κρατήσεις' },
    { value: 'confirmed',  label: 'Επιβεβαιωμένες'    },
    { value: 'checked_in', label: 'Check-in'           },
    { value: 'checked_out',label: 'Check-out'          },
    { value: 'cancelled',  label: 'Ακυρωμένες'        },
]

function Bookings({ onNavigate }) {
    const { bookings, isLoading, updateStatus, remove, reload } = useBookings()
    const [statusFilter,    setStatusFilter]    = useState('all')
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [editingBooking,  setEditingBooking]  = useState(null)
    const { search, setSearch, filtered } = useSearch(bookings, ['last_name', 'first_name', 'room_number'])

    const filteredByStatus = statusFilter === 'all'
        ? filtered
        : filtered.filter((b) => b.status === statusFilter)

    if (isLoading) return (
        <Stack align="center" style={{ padding: '2rem' }}>
            <Spinner size="lg" />
        </Stack>
    )

    return (
        <Stack gap="md" className="bookings">

            <Row justify="between" align="center" gap="md">
                <Row gap="sm" align="center">
                    <Input
                        iconLeft={<span>🔍</span>}
                        placeholder="Αναζήτηση κράτησης..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select
                        value={statusFilter}
                        options={statusOptions}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    />
                </Row>
                <Button onClick={() => onNavigate('new-booking')}>+ Νέα Κράτηση</Button>
            </Row>

            <Card padding="none">
                <Table
                    columns={bookingColumns}
                    data={filteredByStatus}
                    onRowClick={setSelectedBooking}
                    emptyMessage="Δεν βρέθηκαν κρατήσεις"
                />
            </Card>

            {/* Booking Detail Modal */}
            <Modal
                isOpen={!!selectedBooking}
                onClose={() => setSelectedBooking(null)}
                title={selectedBooking ? `Κράτηση #${selectedBooking.id}` : ''}
                size="lg"
                footer={
                    <Row gap="sm">
                        <Button variant="secondary" onClick={() => setSelectedBooking(null)}>
                            Κλείσιμο
                        </Button>
                        <Button variant="danger" onClick={() => {
                            remove(selectedBooking.id)
                            setSelectedBooking(null)
                        }}>
                            Ακύρωση
                        </Button>
                        <Button onClick={() => {
                            setEditingBooking(selectedBooking)
                            setSelectedBooking(null)
                        }}>
                            Επεξεργασία
                        </Button>
                    </Row>
                }
            >
                {selectedBooking && (
                    <BookingDetail
                        booking={selectedBooking}
                        onStatusChange={async (id, status) => {
                            await updateStatus(id, status)
                            setSelectedBooking(null)
                            reload()
                        }}
                    />
                )}
            </Modal>

            {/* Edit Booking Modal */}
            <Modal
                isOpen={!!editingBooking}
                onClose={() => setEditingBooking(null)}
                title={editingBooking ? `Επεξεργασία Κράτησης #${editingBooking.id}` : ''}
                size="lg"
            >
                {editingBooking && (
                    <EditBookingModal
                        booking={editingBooking}
                        onSave={() => {
                            setEditingBooking(null)
                            reload()
                        }}
                        onClose={() => setEditingBooking(null)}
                    />
                )}
            </Modal>

        </Stack>
    )
}

export default Bookings