import { Badge } from '@georgevlachos/ui'
import { formatDate } from '@georgevlachos/utils'
import {
    BOOKING_STATUS_VARIANT,
    BOOKING_STATUS_LABEL,
    PAYMENT_STATUS_VARIANT,
    PAYMENT_STATUS_LABEL,
    BOOKING_SOURCE_LABEL,
} from '@config/statuses'
import './Bookings.css'

const bookingColumns = [
    { key: 'id', label: '#', render: (row) => `#${row.id}` },
    {
        key: 'guestLastName',
        label: 'Πελάτης',
        render: (row) => (
            <div className="bookings__guest">
                <span className="bookings__guest-name">
                    {row.guestLastName} {row.guestFirstName}
                </span>
                <span className="bookings__guest-source">{BOOKING_SOURCE_LABEL[row.source]}</span>
            </div>
        ),
    },
    { key: 'roomNumber', label: 'Δωμάτιο', render: (row) => `Νο. ${row.roomNumber}` },
    {
        key: 'checkIn',
        label: 'Ημερομηνίες',
        render: (row) => (
            <div className="bookings__dates">
                <span className="bookings__dates-range">
                    {formatDate(row.checkIn)} → {formatDate(row.checkOut)}
                </span>
                <span className="bookings__dates-nights">{row.nights} νύχτες</span>
            </div>
        ),
    },
    {
        key: 'status',
        label: 'Κατάσταση',
        render: (row) => (
            <Badge
                label={BOOKING_STATUS_LABEL[row.status]}
                variant={BOOKING_STATUS_VARIANT[row.status]}
            />
        ),
    },
    {
        key: 'paymentStatus',
        label: 'Πληρωμή',
        render: (row) => (
            <Badge
                label={PAYMENT_STATUS_LABEL[row.paymentStatus]}
                variant={PAYMENT_STATUS_VARIANT[row.paymentStatus]}
            />
        ),
    },
    {
        key: 'totalAmount',
        label: 'Σύνολο',
        render: (row) => (
            <div className="bookings__amount">
                <span className="bookings__amount-total">{row.totalAmount}€</span>
                {row.totalAmount - row.paidAmount > 0 && (
                    <span className="bookings__amount-remaining">
                        Υπόλοιπο: {row.totalAmount - row.paidAmount}€
                    </span>
                )}
            </div>
        ),
    },
]

export default bookingColumns
