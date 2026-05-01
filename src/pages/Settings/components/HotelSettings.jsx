import { useState } from 'react'
import FormField from '@components/FormField/FormField'
import Button from '@components/Button/Button'
import useSettingsStore from '@stores/useSettingsStore'
import './HotelSettings.css'

function HotelSettings() {
    const { hotel, updateHotel } = useSettingsStore()
    const [form, setForm] = useState(hotel)

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        updateHotel(form)
    }

    return (
        <div className="hotel-settings">
            <div className="hotel-settings__grid">
                <FormField label="Όνομα Ξενοδοχείου">
                    <input
                        type="text"
                        className="form-field__input"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                </FormField>
                <FormField label="ΑΦΜ">
                    <input
                        type="text"
                        className="form-field__input"
                        value={form.afm}
                        onChange={(e) => handleChange('afm', e.target.value)}
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
                <FormField label="Email">
                    <input
                        type="email"
                        className="form-field__input"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </FormField>
                <FormField label="Διεύθυνση">
                    <input
                        type="text"
                        className="form-field__input"
                        value={form.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                </FormField>
            </div>
            <div>
                <Button onClick={handleSave}>Αποθήκευση</Button>
            </div>
        </div>
    )
}

export default HotelSettings