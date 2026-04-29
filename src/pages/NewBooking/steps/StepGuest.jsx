import { useState } from 'react'
import FormField from '@components/FormField/FormField'
import Button from '@components/Button/Button'
import useSearch from '@hooks/useSearch'
import { mockGuests } from '@config/mockData'
import './StepGuest.css'

function StepGuest({ booking, updateBooking }) {
    const [mode, setMode] = useState('search')
    const { search, setSearch, filtered } = useSearch(mockGuests, ['firstName', 'lastName', 'email', 'phone'])

    const handleSelectGuest = (guest) => {
        updateBooking({ guest })
    }

    const handleNewGuest = (e) => {
        e.preventDefault()
        const form = e.target
        const guest = {
            id:          null,
            firstName:   form.firstName.value,
            lastName:    form.lastName.value,
            email:       form.email.value,
            phone:       form.phone.value,
            nationality: form.nationality.value,
            idNumber:    form.idNumber.value,
            notes:       '',
        }
        updateBooking({ guest })
        setMode('search')
    }

    return (
        <div className="step-guest">
            <div className="step-guest__tabs">
                <button
                    className={`step-guest__tab ${mode === 'search' ? 'step-guest__tab--active' : ''}`}
                    onClick={() => setMode('search')}
                >
                    Υπάρχων Πελάτης
                </button>
                <button
                    className={`step-guest__tab ${mode === 'new' ? 'step-guest__tab--active' : ''}`}
                    onClick={() => setMode('new')}
                >
                    + Νέος Πελάτης
                </button>
            </div>

            {mode === 'search' && (
                <div className="step-guest__search-mode">
                    <div className="step-guest__search">
                        🔍
                        <input
                            type="text"
                            placeholder="Αναζήτηση πελάτη..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="step-guest__list">
                        {filtered.map((guest) => (
                            <div
                                key={guest.id}
                                className={`step-guest__item ${booking.guest?.id === guest.id ? 'step-guest__item--selected' : ''}`}
                                onClick={() => handleSelectGuest(guest)}
                            >
                                <div className="step-guest__item-name">
                                    {guest.lastName} {guest.firstName}
                                </div>
                                <div className="step-guest__item-details">
                                    {guest.email} · {guest.phone}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {mode === 'new' && (
                <form className="step-guest__form" onSubmit={handleNewGuest}>
                    <div className="step-guest__grid">
                        <FormField label="Επώνυμο *">
                            <input name="lastName" type="text" className="form-field__input" required />
                        </FormField>
                        <FormField label="Όνομα *">
                            <input name="firstName" type="text" className="form-field__input" required />
                        </FormField>
                        <FormField label="Email">
                            <input name="email" type="email" className="form-field__input" />
                        </FormField>
                        <FormField label="Τηλέφωνο">
                            <input name="phone" type="text" className="form-field__input" />
                        </FormField>
                        <FormField label="Υπηκοότητα">
                            <input name="nationality" type="text" className="form-field__input" defaultValue="GR" />
                        </FormField>
                        <FormField label="ΑΔΤ / Διαβατήριο">
                            <input name="idNumber" type="text" className="form-field__input" />
                        </FormField>
                    </div>
                    <div className="step-guest__form-actions">
                        <Button type="submit">✓ Προσθήκη Πελάτη</Button>
                    </div>
                </form>
            )}

            {booking.guest && (
                <div className="step-guest__selected">
                    ✓ {booking.guest.lastName} {booking.guest.firstName}
                </div>
            )}
        </div>
    )
}

export default StepGuest