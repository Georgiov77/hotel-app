import { useState } from 'react'
import { Input, Button } from '@georgevlachos/ui'
import useSettingsStore from '@stores/useSettingsStore'
import './SecuritySettings.css'

function SecuritySettings() {
    const { security, updateSecurity } = useSettingsStore()
    const [form, setForm]   = useState({ pin: '', confirmPin: '' })
    const [error, setError] = useState('')
    const [saved, setSaved] = useState(false)

    const handleChangePin = () => {
        if (form.pin.length < 4) {
            setError('Το PIN πρέπει να είναι τουλάχιστον 4 ψηφία')
            return
        }
        if (form.pin !== form.confirmPin) {
            setError('Τα PIN δεν ταιριάζουν')
            return
        }
        updateSecurity({ pin: form.pin })
        setForm({ pin: '', confirmPin: '' })
        setError('')
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="security-settings">
            <div className="security-settings__grid">
                <Input
                    label="Νέο PIN"
                    type="password"
                    placeholder="••••"
                    maxLength={8}
                    value={form.pin}
                    error={error}
                    onChange={(e) => {
                        setForm((prev) => ({ ...prev, pin: e.target.value }))
                        setError('')
                    }}
                    fullWidth
                />
                <Input
                    label="Επιβεβαίωση PIN"
                    type="password"
                    placeholder="••••"
                    maxLength={8}
                    value={form.confirmPin}
                    onChange={(e) => setForm((prev) => ({ ...prev, confirmPin: e.target.value }))}
                    fullWidth
                />
            </div>

            {saved && (
                <div style={{ color: 'var(--color-success)', fontSize: 'var(--text-sm)' }}>
                    ✓ Το PIN άλλαξε επιτυχώς
                </div>
            )}

            <div>
                <Button onClick={handleChangePin}>Αλλαγή PIN</Button>
            </div>

            <Input
                label="Κλείδωμα μετά από αδράνεια (λεπτά)"
                helperText="Η εφαρμογή κλειδώνει αυτόματα μετά από X λεπτά αδράνειας"
                type="number"
                min={1}
                max={60}
                style={{ maxWidth: '120px' }}
                value={security.idleTimeout}
                onChange={(e) => updateSecurity({ idleTimeout: parseInt(e.target.value) || 10 })}
            />
        </div>
    )
}

export default SecuritySettings