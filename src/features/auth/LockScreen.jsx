import { useState } from 'react'
import useSettingsStore from '@stores/useSettingsStore'
import './LockScreen.css'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']

function LockScreen({ onUnlock }) {
    const { security, hotel } = useSettingsStore()
    const [pin, setPin]       = useState('')
    const [error, setError]   = useState('')

    const handleKey = (key) => {
        if (key === '') return
        if (key === '⌫') {
            setPin((prev) => prev.slice(0, -1))
            setError('')
            return
        }

        const newPin = pin + key
        setPin(newPin)
        setError('')

        if (newPin.length === security.pin.length) {
            if (newPin === security.pin) {
                setPin('')
                onUnlock()
            } else {
                setError('Λάθος PIN')
                setPin('')
            }
        }
    }

    return (
        <div className="lock-screen">
            <div className="lock-screen__card">
                <div className="lock-screen__icon">🔒</div>
                <div className="lock-screen__title">{hotel.name}</div>
                <div className="lock-screen__subtitle">Εισάγετε το PIN για να συνεχίσετε</div>

                {/* PIN dots */}
                <div className="lock-screen__pin">
                    {Array.from({ length: security.pin.length }).map((_, i) => (
                        <div
                            key={i}
                            className={`lock-screen__pin-dot ${i < pin.length ? 'lock-screen__pin-dot--filled' : ''}`}
                        />
                    ))}
                </div>

                {error && <div className="lock-screen__error">{error}</div>}

                {/* Keypad */}
                <div className="lock-screen__keypad">
                    {KEYS.map((key, i) => (
                        <div
                            key={i}
                            className={`lock-screen__key ${key === '⌫' ? 'lock-screen__key--delete' : ''} ${key === '' ? '' : ''}`}
                            onClick={() => handleKey(key)}
                            style={key === '' ? { visibility: 'hidden' } : {}}
                        >
                            {key}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LockScreen