import { useState }                          from 'react'
import { useToast, Button, Input, Textarea } from '@georgevlachos/ui'
import guestService        from '@services/guestService'
import { getErrorMessage } from '@error/errorHandler'
import './EditGuestModal.css'

function EditGuestModal({ guest, onSave, onClose }) {
    const { showToast } = useToast()

    const [form, setForm]         = useState({
        first_name:  guest?.first_name  || '',
        last_name:   guest?.last_name   || '',
        email:       guest?.email       || '',
        phone:       guest?.phone       || '',
        nationality: guest?.nationality || 'GR',
        id_number:   guest?.id_number   || '',
        notes:       guest?.notes       || '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        if (!form.last_name || !form.first_name) {
            showToast({ message: 'Επώνυμο και Όνομα είναι υποχρεωτικά', variant: 'danger' })
            return
        }
        try {
            setIsLoading(true)
            if (guest?.id) {
                await guestService.update(guest.id, {
                    firstName:   form.first_name,
                    lastName:    form.last_name,
                    email:       form.email,
                    phone:       form.phone,
                    nationality: form.nationality,
                    idNumber:    form.id_number,
                    notes:       form.notes,
                })
                showToast({ message: 'Ο πελάτης ενημερώθηκε!', variant: 'success' })
            } else {
                await guestService.create({
                    firstName:   form.first_name,
                    lastName:    form.last_name,
                    email:       form.email,
                    phone:       form.phone,
                    nationality: form.nationality,
                    idNumber:    form.id_number,
                    notes:       form.notes,
                })
                showToast({ message: 'Ο πελάτης αποθηκεύτηκε!', variant: 'success' })
            }
            onSave()
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="edit-guest">
            <div className="edit-guest__grid">
                <Input
                    label="Επώνυμο *"
                    value={form.last_name}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                    fullWidth
                />
                <Input
                    label="Όνομα *"
                    value={form.first_name}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                    fullWidth
                />
                <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    fullWidth
                />
                <Input
                    label="Τηλέφωνο"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    fullWidth
                />
                <Input
                    label="Υπηκοότητα"
                    value={form.nationality}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                    fullWidth
                />
                <Input
                    label="ΑΔΤ / Διαβατήριο"
                    value={form.id_number}
                    onChange={(e) => handleChange('id_number', e.target.value)}
                    fullWidth
                />
                <div style={{ gridColumn: '1 / -1' }}>
                    <Textarea
                        label="Σημειώσεις"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: '1rem' }}>
                <Button variant="secondary" onClick={onClose}>Άκυρο</Button>
                <Button onClick={handleSave} loading={isLoading}>
                    Αποθήκευση
                </Button>
            </div>
        </div>
    )
}

export default EditGuestModal