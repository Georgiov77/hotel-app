import { useState }      from 'react'
import { useToast, Button, Modal }      from '@georgevlachos/ui'
import CalendarHeader    from './components/CalendarHeader'
import CalendarGrid      from './components/CalendarGrid'
import BookingDetail     from '@pages/Bookings/BookingDetail'
import useCalendar       from '@hooks/useCalendar'
import useCalendarData   from '@hooks/useCalendarData'
import bookingService    from '@services/bookingService'
import { getErrorMessage } from '@error/errorHandler'
import './Calendar.css'

function Calendar({ onNavigate }) {
    const { showToast } = useToast()
    const { days, goNext, goPrev, goToday, isToday } = useCalendar()
    const { rooms, bookings, isLoading, reload }      = useCalendarData(days[0], days[days.length - 1])
    const [selectedBooking, setSelectedBooking]       = useState(null)

    const handleCellClick = (day, room) => {
        onNavigate('new-booking', { checkIn: day, room })
    }

    const handleStatusChange = async (id, status) => {
        try {
            await bookingService.updateStatus(id, status)
            showToast({ message: 'Η κατάσταση ενημερώθηκε!', variant: 'success' })
            setSelectedBooking(null)
            reload()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        }
    }

    if (isLoading) return <div>Φόρτωση...</div>

    return (
        <div className="calendar">
            <CalendarHeader
                days={days}
                onPrev={goPrev}
                onNext={goNext}
                onToday={goToday}
                onNewBooking={() => onNavigate('new-booking', null)}
            />

            <CalendarGrid
                days={days}
                rooms={rooms.map((r) => ({ ...r, hasKitchen: r.has_kitchen === 1 }))}
                bookings={bookings}
                isToday={isToday}
                onBookingClick={setSelectedBooking}
                onCellClick={handleCellClick}
            />

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
                        <Button>Επεξεργασία</Button>
                    </>
                }
            >
                {selectedBooking && (
                    <BookingDetail
                        booking={selectedBooking}
                        onStatusChange={handleStatusChange}
                    />
                )}
            </Modal>
        </div>
    )
}

export default Calendar