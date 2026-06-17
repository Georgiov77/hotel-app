import { useState } from 'react'
import FormField from '@components/FormField/FormField'
import { Button } from '@georgevlachos/ui'
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

            {/* Αλλαγή PIN */}
            <div className="security-settings__grid">
                <FormField label="Νέο PIN" error={error}>
                    <input
                        type="password"
                        className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
                        placeholder="••••"
                        maxLength={8}
                        value={form.pin}
                        onChange={(e) => {
                            setForm((prev) => ({ ...prev, pin: e.target.value }))
                            setError('')
                        }}
                    />
                </FormField>
                <FormField label="Επιβεβαίωση PIN">
                    <input
                        type="password"
                        className="form-field__input"
                        placeholder="••••"
                        maxLength={8}
                        value={form.confirmPin}
                        onChange={(e) => setForm((prev) => ({ ...prev, confirmPin: e.target.value }))}
                    />
                </FormField>
            </div>

            {saved && (
                <div style={{ color: 'var(--color-success)', fontSize: 'var(--text-sm)' }}>
                    ✓ Το PIN άλλαξε επιτυχώς
                </div>
            )}

            <div>
                <Button onClick={handleChangePin}>Αλλαγή PIN</Button>
            </div>

            {/* Idle timeout */}
            <FormField
                label="Κλείδωμα μετά από αδράνεια (λεπτά)"
                hint="Η εφαρμογή κλειδώνει αυτόματα μετά από X λεπτά αδράνειας"
            >
                <input
                    type="number"
                    className="form-field__input"
                    min={1}
                    max={60}
                    style={{ maxWidth: '120px' }}
                    value={security.idleTimeout}
                    onChange={(e) => updateSecurity({ idleTimeout: parseInt(e.target.value) || 10 })}
                />
            </FormField>

        </div>
    )
}

export default SecuritySettings