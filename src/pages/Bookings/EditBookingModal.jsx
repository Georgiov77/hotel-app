import { useState } from 'react'
import { useToast, Button, Input, Textarea, Select } from '@georgevlachos/ui'
import bookingService from '@services/bookingService'
import { getErrorMessage } from '@error/errorHandler'
import { calcNights } from '@georgevlachos/utils'
import { BOOKING_SOURCE_LABEL } from '@config/statuses'
import './EditBookingModal.css'

function EditBookingModal({ booking, onSave, onClose }) {
    const { showToast } = useToast()

    const [form, setForm] = useState({
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        adults: booking.adults,
        children: booking.children,
        pricePerNight: booking.pricePerNight,
        totalAmount: booking.totalAmount,
        depositAmount: booking.depositAmount,
        paidAmount: booking.paidAmount,
        paymentStatus: booking.paymentStatus,
        source: booking.source,
        notes: booking.notes || '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (field, value) => {
        setForm((prev) => {
            const updated = { ...prev, [field]: value }

            if (field === 'checkIn' || field === 'checkOut') {
                if (updated.checkIn && updated.checkOut) {
                    const nights = calcNights(updated.checkIn, updated.checkOut)
                    updated.nights = nights > 0 ? nights : 1
                    updated.totalAmount = nights * updated.pricePerNight
                }
            }

            if (field === 'pricePerNight') {
                const nights = calcNights(updated.checkIn, updated.checkOut)
                updated.totalAmount = nights * parseFloat(value)
            }

            return updated
        })
    }

    const handleSave = async () => {
        try {
            setIsLoading(true)
            await bookingService.update(booking.id, {
                roomId: booking.roomId,
                guestId: booking.guestId,
                checkIn: form.checkIn,
                checkOut: form.checkOut,
                nights: calcNights(form.checkIn, form.checkOut),
                adults: parseInt(form.adults),
                children: parseInt(form.children),
                status: booking.status,
                source: form.source,
                pricePerNight: parseFloat(form.pricePerNight),
                totalAmount: parseFloat(form.totalAmount),
                depositAmount: parseFloat(form.depositAmount),
                paidAmount: parseFloat(form.paidAmount),
                paymentStatus: form.paymentStatus,
                notes: form.notes,
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
        { value: 'unpaid', label: 'Αδήλωτο' },
        { value: 'deposit', label: 'Προκαταβολή' },
        { value: 'paid', label: 'Εξοφλημένο' },
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
                        value={form.checkIn}
                        onChange={(e) => handleChange('checkIn', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Check-out"
                        type="date"
                        value={form.checkOut}
                        min={form.checkIn}
                        onChange={(e) => handleChange('checkOut', e.target.value)}
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
                        value={form.pricePerNight}
                        onChange={(e) => handleChange('pricePerNight', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Σύνολο (€)"
                        type="number"
                        value={form.totalAmount}
                        onChange={(e) => handleChange('totalAmount', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Προκαταβολή (€)"
                        type="number"
                        value={form.depositAmount}
                        onChange={(e) => handleChange('depositAmount', e.target.value)}
                        fullWidth
                    />
                    <Input
                        label="Πληρωμένο (€)"
                        type="number"
                        value={form.paidAmount}
                        onChange={(e) => handleChange('paidAmount', e.target.value)}
                        fullWidth
                    />
                    <Select
                        label="Κατάσταση Πληρωμής"
                        value={form.paymentStatus}
                        options={paymentOptions}
                        onChange={(e) => handleChange('paymentStatus', e.target.value)}
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
                <Button variant="secondary" onClick={onClose}>
                    Άκυρο
                </Button>
                <Button onClick={handleSave} loading={isLoading}>
                    Αποθήκευση
                </Button>
            </div>
        </div>
    )
}

export default EditBookingModal
