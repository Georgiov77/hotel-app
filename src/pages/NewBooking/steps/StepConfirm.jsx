import { Badge, Stack, Grid } from '@georgevlachos/ui'
import { formatDate } from '@georgevlachos/utils'
import { BOOKING_SOURCE_LABEL, PAYMENT_STATUS_LABEL, PAYMENT_STATUS_VARIANT } from '@config/statuses'
import './StepConfirm.css'

function StepConfirm({ booking }) {
    const extrasTotal = booking.extras.reduce((sum, e) => sum + e.total, 0)
    const grandTotal  = booking.totalAmount + extrasTotal
    const remaining   = grandTotal - booking.depositAmount

    return (
        <Stack gap="lg" className="step-confirm">

            <Stack gap="sm" className="step-confirm__section">
                <div className="step-confirm__section-title">Στοιχεία Κράτησης</div>
                <Grid columns="2" gap="md" className="step-confirm__grid">
                    <div className="step-confirm__field">
                        <span className="step-confirm__label">Πελάτης</span>
                        <span className="step-confirm__value">
                            {booking.guest?.last_name || booking.guest?.lastName}{' '}
                            {booking.guest?.first_name || booking.guest?.firstName}
                        </span>
                    </div>
                    <div className="step-confirm__field">
                        <span className="step-confirm__label">Δωμάτιο</span>
                        <span className="step-confirm__value">
                            Νο. {booking.room?.number} — {booking.room?.type}
                        </span>
                    </div>
                    <div className="step-confirm__field">
                        <span className="step-confirm__label">Check-in</span>
                        <span className="step-confirm__value">{formatDate(booking.checkIn)}</span>
                    </div>
                    <div className="step-confirm__field">
                        <span className="step-confirm__label">Check-out</span>
                        <span className="step-confirm__value">{formatDate(booking.checkOut)}</span>
                    </div>
                    <div className="step-confirm__field">
                        <span className="step-confirm__label">Διανυκτερεύσεις</span>
                        <span className="step-confirm__value">{booking.nights} νύχτες</span>
                    </div>
                    <div className="step-confirm__field">
                        <span className="step-confirm__label">Άτομα</span>
                        <span className="step-confirm__value">
                            {booking.adults} ενήλικες {booking.children > 0 ? `/ ${booking.children} παιδιά` : ''}
                        </span>
                    </div>
                    <div className="step-confirm__field">
                        <span className="step-confirm__label">Προέλευση</span>
                        <span className="step-confirm__value">{BOOKING_SOURCE_LABEL[booking.source]}</span>
                    </div>
                </Grid>
            </Stack>

            {booking.extras.length > 0 && (
                <Stack gap="sm" className="step-confirm__section">
                    <div className="step-confirm__section-title">Extras</div>
                    {booking.extras.map((extra) => (
                        <div key={extra.id} className="step-confirm__extra">
                            <span>{extra.description}</span>
                            <span>{extra.total}€</span>
                        </div>
                    ))}
                </Stack>
            )}

            <Stack gap="sm" className="step-confirm__section">
                <div className="step-confirm__section-title">Πληρωμή</div>
                <div className="step-confirm__payment">
                    <div className="step-confirm__payment-row">
                        <span>Δωμάτιο ({booking.nights} νύχτες × {booking.pricePerNight}€)</span>
                        <span>{booking.totalAmount}€</span>
                    </div>
                    {extrasTotal > 0 && (
                        <div className="step-confirm__payment-row">
                            <span>Extras</span>
                            <span>{extrasTotal}€</span>
                        </div>
                    )}
                    <div className="step-confirm__payment-row step-confirm__payment-row--total">
                        <span>Σύνολο</span>
                        <span>{grandTotal}€</span>
                    </div>
                    {booking.depositAmount > 0 && (
                        <>
                            <div className="step-confirm__payment-row">
                                <span>Προκαταβολή</span>
                                <span>{booking.depositAmount}€</span>
                            </div>
                            <div className="step-confirm__payment-row">
                                <span>Υπόλοιπο</span>
                                <span>{remaining}€</span>
                            </div>
                        </>
                    )}
                    <div style={{ marginTop: 'var(--space-2)' }}>
                        <Badge
                            label={PAYMENT_STATUS_LABEL[booking.paymentStatus]}
                            variant={PAYMENT_STATUS_VARIANT[booking.paymentStatus]}
                        />
                    </div>
                </div>
            </Stack>

        </Stack>
    )
}

export default StepConfirm