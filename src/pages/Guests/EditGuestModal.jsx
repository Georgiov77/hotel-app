import { useState }        from 'react'
import { useToast }        from '@georgevlachos/ui'
import FormField           from '@components/FormField/FormField'
import Button              from '@components/Button/Button'
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
                <FormField label="Επώνυμο *">
                    <input
                        type="text"
                        className="form-field__input"
                        value={form.last_name}
                        onChange={(e) => handleChange('last_name', e.target.value)}
                    />
                </FormField>
                <FormField label="Όνομα *">
                    <input
                        type="text"
                        className="form-field__input"
                        value={form.first_name}
                        onChange={(e) => handleChange('first_name', e.target.value)}
                    />
                </FormField>
                <FormField label="Email">
                    <input
                        type="email"
                        className="form-field__input"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </FormField>
                <FormField label="Τηλέφωνο">
                    <input
                        type="text"
                        className="form-field__input"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                </FormField>
                <FormField label="Υπηκοότητα">
                    <input
                        type="text"
                        className="form-field__input"
                        value={form.nationality}
                        onChange={(e) => handleChange('nationality', e.target.value)}
                    />
                </FormField>
                <FormField label="ΑΔΤ / Διαβατήριο">
                    <input
                        type="text"
                        className="form-field__input"
                        value={form.id_number}
                        onChange={(e) => handleChange('id_number', e.target.value)}
                    />
                </FormField>
                <FormField label="Σημειώσεις" style={{ gridColumn: '1 / -1' }}>
                    <textarea
                        className="form-field__input"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                    />
                </FormField>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <Button variant="secondary" onClick={onClose}>Άκυρο</Button>
                <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Αποθήκευση...' : 'Αποθήκευση'}
                </Button>
            </div>
        </div>
    )
}

export default EditGuestModal