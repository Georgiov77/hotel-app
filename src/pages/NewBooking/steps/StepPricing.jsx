import FormField          from '@components/FormField/FormField'
import { Button }             from '@georgevlachos/ui'
import { BOOKING_SOURCE_LABEL } from '@config/statuses'
import { SEASONS, DEPOSIT_OPTIONS } from '@config/pricing'
import { calcDeposit }    from '@utils/pricingUtils'
import usePricing         from '@hooks/usePricing'
import useSettingsStore   from '@stores/useSettingsStore'
import './StepPricing.css'

function StepPricing({ booking, updateBooking }) {
    const { pricing } = useSettingsStore()
    const {
        extrasTotal,
        grandTotal,
        handleSeasonChange,
        handleCustomPrice,
        handleAddExtra,
        handleExtraChange,
        handleRemoveExtra,
        handleDepositOption,
        handleCustomDeposit,
        isDepositActive,
    } = usePricing(booking, updateBooking)

    return (
        <div className="step-pricing">

            {/* Σεζόν */}
            <div className="step-pricing__section">
                <div className="step-pricing__section-title">Τιμή Δωματίου</div>
                <div className="step-pricing__seasons">
                    {SEASONS.map((season) => (
                        <div
                            key={season.id}
                            className={`step-pricing__season ${booking.season === season.id ? 'step-pricing__season--active' : ''}`}
                            onClick={() => handleSeasonChange(season)}
                        >
                            <div className="step-pricing__season-label">{season.label}</div>
                            {season.id !== 'custom' && (
                                <div className="step-pricing__season-price">
                                    {pricing[season.id]?.[booking.room?.type] || 0}€ / νύχτα
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {booking.season === 'custom' && (
                    <FormField label="Custom Τιμή ανά νύχτα (€)">
                        <input
                            type="number"
                            className="form-field__input"
                            value={booking.pricePerNight || ''}
                            onChange={(e) => handleCustomPrice(e.target.value)}
                        />
                    </FormField>
                )}
            </div>

            {/* Προέλευση */}
            <div className="step-pricing__section">
                <div className="step-pricing__section-title">Προέλευση Κράτησης</div>
                <div className="step-pricing__sources">
                    {Object.entries(BOOKING_SOURCE_LABEL).map(([key, label]) => (
                        <div
                            key={key}
                            className={`step-pricing__source ${booking.source === key ? 'step-pricing__source--active' : ''}`}
                            onClick={() => updateBooking({ source: key })}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Extras */}
            <div className="step-pricing__section">
                <div className="step-pricing__section-title">Extras</div>
                {booking.extras.map((extra) => (
                    <div key={extra.id} className="step-pricing__extra">
                        <FormField label="Περιγραφή">
                            <input
                                type="text"
                                className="form-field__input"
                                value={extra.description}
                                placeholder="π.χ. Πρωινό"
                                onChange={(e) => handleExtraChange(extra.id, 'description', e.target.value)}
                            />
                        </FormField>
                        <FormField label="Τιμή/μέρα (€)">
                            <input
                                type="number"
                                className="form-field__input"
                                value={extra.pricePerDay}
                                onChange={(e) => handleExtraChange(extra.id, 'pricePerDay', parseFloat(e.target.value) || 0)}
                            />
                        </FormField>
                        <FormField label="Μέρες">
                            <input
                                type="number"
                                className="form-field__input"
                                value={extra.days}
                                onChange={(e) => handleExtraChange(extra.id, 'days', parseInt(e.target.value) || 0)}
                            />
                        </FormField>
                        <FormField label="Σύνολο">
                            <input
                                type="number"
                                className="form-field__input"
                                value={extra.total}
                                readOnly
                            />
                        </FormField>
                        <button
                            className="step-pricing__extra-remove"
                            onClick={() => handleRemoveExtra(extra.id)}
                        >✕</button>
                    </div>
                ))}
                <Button variant="secondary" onClick={handleAddExtra}>
                    + Προσθήκη Extra
                </Button>
            </div>

            {/* Πληρωμή */}
            <div className="step-pricing__section">
                <div className="step-pricing__section-title">Πληρωμή</div>
                <div className="step-pricing__payment-options">
                    {DEPOSIT_OPTIONS.map((option) => (
                        <div
                            key={option.id}
                            className={`step-pricing__payment-option ${isDepositActive(option) ? 'step-pricing__payment-option--active' : ''}`}
                            onClick={() => handleDepositOption(option)}
                        >
                            <div className="step-pricing__payment-option-label">{option.label}</div>
                            <div className="step-pricing__payment-option-sub">
                                {option.pct !== null ? `${calcDeposit(grandTotal, option.pct)}€` : 'Ορίστε ποσό'}
                            </div>
                        </div>
                    ))}
                </div>
                {booking._customDeposit && (
                    <FormField label="Ποσό Προκαταβολής (€)">
                        <input
                            type="number"
                            className="form-field__input"
                            min={0}
                            max={grandTotal}
                            value={booking.depositAmount || ''}
                            onChange={(e) => handleCustomDeposit(e.target.value)}
                        />
                    </FormField>
                )}
            </div>

            {/* Σύνοψη */}
            <div className="step-pricing__summary">
                <div className="step-pricing__summary-row">
                    <span>Δωμάτιο ({booking.nights} νύχτες × {booking.pricePerNight}€)</span>
                    <span>{booking.totalAmount}€</span>
                </div>
                {extrasTotal > 0 && (
                    <div className="step-pricing__summary-row">
                        <span>Extras</span>
                        <span>{extrasTotal}€</span>
                    </div>
                )}
                <div className="step-pricing__summary-row step-pricing__summary-row--total">
                    <span>Σύνολο</span>
                    <span>{grandTotal}€</span>
                </div>
                {booking.depositAmount > 0 && (
                    <div className="step-pricing__summary-row">
                        <span>Υπόλοιπο</span>
                        <span>{grandTotal - booking.depositAmount}€</span>
                    </div>
                )}
            </div>

        </div>
    )
}

export default StepPricing