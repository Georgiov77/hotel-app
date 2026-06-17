import { useState } from 'react'
import { Input, Button } from '@georgevlachos/ui'
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
                <Input
                    label="Όνομα Ξενοδοχείου"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    fullWidth
                />
                <Input
                    label="ΑΦΜ"
                    value={form.afm}
                    onChange={(e) => handleChange('afm', e.target.value)}
                    fullWidth
                />
                <Input
                    label="Τηλέφωνο"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
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
                    label="Διεύθυνση"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    fullWidth
                />
            </div>
            <div>
                <Button onClick={handleSave}>Αποθήκευση</Button>
            </div>
        </div>
    )
}

export default HotelSettings