import Badge from '@components/Badge/Badge'
import { formatDate } from '@utils/dateUtils'
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
        key: 'last_name',
        label: 'Πελάτης',
        render: (row) => (
            <div className="bookings__guest">
                <span className="bookings__guest-name">{row.last_name} {row.first_name}</span>
                <span className="bookings__guest-source">{BOOKING_SOURCE_LABEL[row.source]}</span>
            </div>
        ),
    },
    { key: 'room_number', label: 'Δωμάτιο', render: (row) => `Νο. ${row.room_number}` },
    {
        key: 'check_in',
        label: 'Ημερομηνίες',
        render: (row) => (
            <div className="bookings__dates">
        <span className="bookings__dates-range">
          {formatDate(row.check_in)} → {formatDate(row.check_out)}
        </span>
                <span className="bookings__dates-nights">{row.nights} νύχτες</span>
            </div>
        ),
    },
    {
        key: 'status',
        label: 'Κατάσταση',
        render: (row) => (
            <Badge variant={BOOKING_STATUS_VARIANT[row.status]}>
                {BOOKING_STATUS_LABEL[row.status]}
            </Badge>
        ),
    },
    {
        key: 'payment_status',
        label: 'Πληρωμή',
        render: (row) => (
            <Badge variant={PAYMENT_STATUS_VARIANT[row.payment_status]}>
                {PAYMENT_STATUS_LABEL[row.payment_status]}
            </Badge>
        ),
    },
    {
        key: 'total_amount',
        label: 'Σύνολο',
        render: (row) => (
            <div className="bookings__amount">
                <span className="bookings__amount-total">{row.total_amount}€</span>
                {row.total_amount - row.paid_amount > 0 && (
                    <span className="bookings__amount-remaining">
            Υπόλοιπο: {row.total_amount - row.paid_amount}€
          </span>
                )}
            </div>
        ),
    },
]

export default bookingColumns