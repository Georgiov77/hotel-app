import { useState }      from 'react'
import Card              from '@components/Card/Card'
import Button            from '@components/Button/Button'
import Table             from '@components/Table/Table'
import Modal             from '@components/Modal/Modal'
import BookingDetail     from './BookingDetail'
import useBookings       from '@hooks/useBookings'
import useSearch         from '@hooks/useSearch'
import bookingColumns    from './bookings.columns'
import './Bookings.css'

function Bookings({ onNavigate }) {
    const { bookings, isLoading, updateStatus, remove, reload } = useBookings()
    const [statusFilter,     setStatusFilter]     = useState('all')
    const [selectedBooking,  setSelectedBooking]  = useState(null)
    const { search, setSearch, filtered } = useSearch(bookings, ['last_name', 'first_name', 'room_number'])

    const filteredByStatus = statusFilter === 'all'
        ? filtered
        : filtered.filter((b) => b.status === statusFilter)

    if (isLoading) return <div>Φόρτωση...</div>

    return (
        <div className="bookings">
            <div className="bookings__toolbar">
                <div className="bookings__filters">
                    <div className="bookings__search">
                        🔍
                        <input
                            type="text"
                            placeholder="Αναζήτηση κράτησης..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="bookings__filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Όλες οι κρατήσεις</option>
                        <option value="confirmed">Επιβεβαιωμένες</option>
                        <option value="checked_in">Check-in</option>
                        <option value="checked_out">Check-out</option>
                        <option value="cancelled">Ακυρωμένες</option>
                    </select>
                </div>
                <Button onClick={() => onNavigate('new-booking')}>+ Νέα Κράτηση</Button>
            </div>

            <Card>
                <Table
                    columns={bookingColumns}
                    data={filteredByStatus}
                    onRowClick={setSelectedBooking}
                    emptyMessage="Δεν βρέθηκαν κρατήσεις"
                />
            </Card>

            <Modal
                isOpen={!!selectedBooking}
                onClose={() => setSelectedBooking(null)}
                title={selectedBooking ? `Κράτηση #${selectedBooking.id}` : ''}
                size="lg"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setSelectedBooking(null)}>
                            Κλείσιμο
                        </Button>
                        <Button variant="danger" onClick={() => {
                            remove(selectedBooking.id)
                            setSelectedBooking(null)
                        }}>
                            Ακύρωση
                        </Button>
                    </>
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
        </div>
    )
}

export default Bookings