import { useState }                               from 'react'
import { useToast, Button, Input, Textarea, Select } from '@georgevlachos/ui'
import bookingService      from '@services/bookingService'
import { getErrorMessage } from '@error/errorHandler'
import { calcNights }      from '@georgevlachos/utils'
import { BOOKING_SOURCE_LABEL } from '@config/statuses'
import './EditBookingModal.css'

function EditBookingModal({ booking, onSave, onClose }) {
    const { showToast } = useToast()

    const [form, setForm]         = useState({
        check_in:        booking.check_in,
        check_out:       booking.check_out,
        adults:          booking.adults,
        children:        booking.children,
        price_per_night: booking.price_per_night,
        total_amount:    booking.total_amount,
        deposit_amount:  booking.deposit_amount,
        paid_amount:     booking.paid_amount,
        payment_status:  booking.payment_status,
        source:          booking.source,
        notes:           booking.notes || '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (field, value) => {
        setForm((prev) => {
            const updated = { ...prev, [field]: value }

            if (field === 'check_in' || field === 'check_out') {
                if (updated.check_in && updated.check_out) {
                    const nights = calcNights(updated.check_in, updated.check_out)
                    updated.nights       = nights > 0 ? nights : 1
                    updated.total_amount = nights * updated.price_per_night
                }
            }

            if (field === 'price_per_night') {
                const nights = calcNights(updated.check_in, updated.check_out)
                updated.total_amount = nights * parseFloat(value)
            }

            return updated
        })
    }

    const handleSave = async () => {
        try {
            setIsLoading(true)
            await bookingService.update(booking.id, {
                roomId:        booking.room_id,
                guestId:       booking.guest_id,
                checkIn:       form.check_in,
                checkOut:      form.check_out,
                nights:        calcNights(form.check_in, form.check_out),
                adults:        parseInt(form.adults),
                children:      parseInt(form.children),
                status:        booking.status,
                source:        form.source,
                pricePerNight: parseFloat(form.price_per_night),
                totalAmount:   parseFloat(form.total_amount),
                depositAmount: parseFloat(form.deposit_amount),
                paidAmount:    parseFloat(form.paid_amount),
                paymentStatus: form.payment_status,
                notes:         form.notes,
            })
            showToast({ message: 'Η κράτηση ενημερώθηκε!', variant: 'success' })
            onSave()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        } finally {
            setIsLoading(false)
        }
    }

    const paymentOptions = [
        { value: 'unpaid',  label: 'Αδήλωτο' },
        { value: 'deposit', label: 'Προκαταβολή' },
        { value: 'paid',    label: 'Εξοφλημένο' },
    ]

    const sourceOptions = Object.entries(BOOKING_SOURCE_LABEL).map(([key, label]) => ({
        value: key,
        label,
    }))

    return (
        <div className="edit-booking">

            <div className="edit-booking__section">
                <div className="edit-booking__section-title">Ημερομηνίες</div>
                <div className="edit-booking__grid">
                    <Input
                        label="Check-in"
                        type="date"
                        value={form.check_in}
                        onChange={(e) => handleChange('check_in', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Check-out"
                        type="date"
                        value={form.check_out}
                        min={form.check_in}
                        onChange={(e) => handleChange('check_out', e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            <div className="edit-booking__section">
                <div className="edit-booking__section-title">Άτομα</div>
                <div className="edit-booking__grid">
                    <Input
                        label="Ενήλικες"
                        type="number"
                        min={1}
                        max={6}
                        value={form.adults}
                        onChange={(e) => handleChange('adults', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Παιδιά"
                        type="number"
                        min={0}
                        max={6}
                        value={form.children}
                        onChange={(e) => handleChange('children', e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            <div className="edit-booking__section">
                <div className="edit-booking__section-title">Τιμολόγηση</div>
                <div className="edit-booking__grid">
                    <Input
                        label="Τιμή/νύχτα (€)"
                        type="number"
                        value={form.price_per_night}
                        onChange={(e) => handleChange('price_per_night', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Σύνολο (€)"
                        type="number"
                        value={form.total_amount}
                        onChange={(e) => handleChange('total_amount', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Προκαταβολή (€)"
                        type="number"
                        value={form.deposit_amount}
                        onChange={(e) => handleChange('deposit_amount', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Πληρωμένο (€)"
                        type="number"
                        value={form.paid_amount}
                        onChange={(e) => handleChange('paid_amount', e.target.value)}
                        fullWidth
                    />
                    <Select
                        label="Κατάσταση Πληρωμής"
                        value={form.payment_status}
                        options={paymentOptions}
                        onChange={(e) => handleChange('payment_status', e.target.value)}
                        fullWidth
                    />
                    <Select
                        label="Προέλευση"
                        value={form.source}
                        options={sourceOptions}
                        onChange={(e) => handleChange('source', e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            <div className="edit-booking__section">
                <div className="edit-booking__section-title">Σημειώσεις</div>
                <Textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    fullWidth
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <Button variant="secondary" onClick={onClose}>Άκυρο</Button>
                <Button onClick={handleSave} loading={isLoading}>
                    Αποθήκευση
                </Button>
            </div>

        </div>
    )
}

export default EditBookingModal