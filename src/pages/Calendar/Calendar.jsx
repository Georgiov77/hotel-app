import { useState } from 'react'
import CalendarHeader from './components/CalendarHeader'
import CalendarGrid from './components/CalendarGrid'
import Modal from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import BookingDetail from '@pages/Bookings/BookingDetail'
import useCalendar from '@hooks/useCalendar'
import { mockRooms, mockBookings } from '@config/mockData'
import './Calendar.css'

function Calendar({ onNavigate }) {
    const { days, goNext, goPrev, goToday, isToday } = useCalendar()
    const [selectedBooking, setSelectedBooking] = useState(null)

    const handleCellClick = (day, room) => {
        onNavigate('new-booking', {checkIn: day, room})
    }

    return (
        <div className="calendar">
            <CalendarHeader
                days={days}
                onPrev={goPrev}
                onNext={goNext}
                onToday={goToday}
            />

            <CalendarGrid
                days={days}
                rooms={mockRooms}
                bookings={mockBookings}
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
                    <BookingDetail booking={selectedBooking} />
                )}
            </Modal>
        </div>
    )
}

export default Calendar