import Badge from '@components/Badge/Badge'
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

function BookingDetail({ booking }) {
    const remaining = booking.totalAmount - booking.paidAmount

    return (
        <div className="booking-detail">

            {/* Στοιχεία πελάτη & δωματίου */}
            <div className="booking-detail__section">
                <div className="booking-detail__section-title">Στοιχεία Κράτησης</div>
                <div className="booking-detail__grid">
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Πελάτης</span>
                        <span className="booking-detail__value">{booking.guestName}</span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Δωμάτιο</span>
                        <span className="booking-detail__value">Νο. {booking.roomNumber}</span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Check-in</span>
                        <span className="booking-detail__value">{formatDate(booking.checkIn)}</span>
                    </div>
                    <div className="booking-detail__field">
                        <span className="booking-detail__label">Check-out</span>
                        <span className="booking-detail__value">{formatDate(booking.checkOut)}</span>
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
                        <span className="booking-detail__payment-value">{booking.totalAmount}€</span>
                    </div>
                    <div className="booking-detail__payment-card">
                        <span className="booking-detail__payment-label">Έχει πληρωθεί</span>
                        <span className="booking-detail__payment-value">{booking.paidAmount}€</span>
                    </div>
                    <div className="booking-detail__payment-card">
                        <span className="booking-detail__payment-label">Υπόλοιπο</span>
                        <span className={`booking-detail__payment-value ${remaining > 0 ? 'booking-detail__payment-value--remaining' : ''}`}>
              {remaining}€
            </span>
                    </div>
                </div>
                <div style={{ marginTop: 'var(--space-2)' }}>
                    <Badge variant={PAYMENT_STATUS_VARIANT[booking.paymentStatus]}>
                        {PAYMENT_STATUS_LABEL[booking.paymentStatus]}
                    </Badge>
                </div>
            </div>

            {/* Extras */}
            <div className="booking-detail__section">
                <div className="booking-detail__section-title">Extras</div>
                {booking.extras.length ? (
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
            <div className="booking-detail__section">
                <div className="booking-detail__section-title">Ενέργειες</div>
                <div className="booking-detail__actions">
                    {booking.status === 'confirmed' && (
                        <Button>Check-in</Button>
                    )}
                    {booking.status === 'checked_in' && (
                        <Button>Check-out</Button>
                    )}
                    {booking.status !== 'cancelled' && booking.status !== 'checked_out' && (
                        <Button variant="danger">Ακύρωση</Button>
                    )}
                </div>
            </div>

        </div>
    )
}

export default BookingDetail