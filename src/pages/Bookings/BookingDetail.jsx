import Badge  from '@components/Badge/Badge'
import Button from '@components/Button/Button'
import { formatDate } from '@utils/dateUtils'
import {
    BOOKING_STATUS_VARIANT,
    BOOKING_STATUS_LABEL,
    PAYMENT_STATUS_VARIANT,
    PAYMENT_STATUS_LABEL,
    BOOKING_SOURCE_LABEL,
} from '@config/statuses'
import './BookingDetail.css'

function BookingDetail({ booking, onStatusChange }) {
    const guestName  = `${booking.last_name || ''} ${booking.first_name || ''}`.trim()
    const roomNumber = booking.room_number
    const remaining  = (booking.total_amount || 0) - (booking.paid_amount || 0)

    return (
        <div className="booking-detail">

            {/* Στοιχεία κράτησης */}
            <div className="booking-detail__section">
                <div className="booking-detail__section-title">Στοιχεία Κράτησης</div>
                <div className="booking-detail__grid">
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Πελάτης</span>
                        <span className="booking-detail__value">{guestName}</span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Δωμάτιο</span>
                        <span className="booking-detail__value">Νο. {roomNumber}</span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Check-in</span>
                        <span className="booking-detail__value">{formatDate(booking.check_in)}</span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Check-out</span>
                        <span className="booking-detail__value">{formatDate(booking.check_out)}</span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Διανυκτερεύσεις</span>
                        <span className="booking-detail__value">{booking.nights} νύχτες</span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Άτομα</span>
                        <span className="booking-detail__value">
              {booking.adults} ενήλικες {booking.children > 0 ? `/ ${booking.children} παιδιά` : ''}
            </span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Προέλευση</span>
                        <span className="booking-detail__value">{BOOKING_SOURCE_LABEL[booking.source]}</span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Κατάσταση</span>
                        <Badge variant={BOOKING_STATUS_VARIANT[booking.status]}>
                            {BOOKING_STATUS_LABEL[booking.status]}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Πληρωμή */}
            <div className="booking-detail__section">
                <div className="booking-detail__section-title">Πληρωμή</div>
                <div className="booking-detail__payment">
                    <div className="booking-detail__payment-card">
                        <span className="booking-detail__payment-label">Σύνολο</span>
                        <span className="booking-detail__payment-value">{booking.total_amount}€</span>
                    </div>
                    <div className="booking-detail__payment-card">
                        <span className="booking-detail__payment-label">Έχει πληρωθεί</span>
                        <span className="booking-detail__payment-value">{booking.paid_amount}€</span>
                    </div>
                    <div className="booking-detail__payment-card">
                        <span className="booking-detail__payment-label">Υπόλοιπο</span>
                        <span className={`booking-detail__payment-value ${remaining > 0 ? 'booking-detail__payment-value--remaining' : ''}`}>
              {remaining}€
            </span>
                    </div>
                </div>
                <div style={{ marginTop: 'var(--space-2)' }}>
                    <Badge variant={PAYMENT_STATUS_VARIANT[booking.payment_status]}>
                        {PAYMENT_STATUS_LABEL[booking.payment_status]}
                    </Badge>
                </div>
            </div>

            {/* Extras */}
            <div className="booking-detail__section">
                <div className="booking-detail__section-title">Extras</div>
                {booking.extras?.length ? (
                    <div className="booking-detail__extras">
                        {booking.extras.map((extra) => (
                            <div key={extra.id} className="booking-detail__extra">
                                <span className="booking-detail__extra-desc">{extra.description}</span>
                                <span className="booking-detail__extra-amount">{extra.total}€</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className="booking-detail__empty">Δεν υπάρχουν extras</span>
                )}
            </div>

            {/* Σημειώσεις */}
            <div className="booking-detail__section">
                <div className="booking-detail__section-title">Σημειώσεις</div>
                {booking.notes ? (
                    <p className="booking-detail__notes">{booking.notes}</p>
                ) : (
                    <span className="booking-detail__empty">Δεν υπάρχουν σημειώσεις</span>
                )}
            </div>

            {/* Actions */}
            {onStatusChange && (
                <div className="booking-detail__section">
                    <div className="booking-detail__section-title">Ενέργειες</div>
                    <div className="booking-detail__actions">
                        {booking.status === 'confirmed' && (
                            <Button onClick={() => onStatusChange(booking.id, 'checked_in')}>
                                Check-in
                            </Button>
                        )}
                        {booking.status === 'checked_in' && (
                            <Button onClick={() => onStatusChange(booking.id, 'checked_out')}>
                                Check-out
                            </Button>
                        )}
                        {booking.status !== 'cancelled' && booking.status !== 'checked_out' && (
                            <Button variant="danger" onClick={() => onStatusChange(booking.id, 'cancelled')}>
                                Ακύρωση
                            </Button>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default BookingDetail