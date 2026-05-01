import FormField from '@components/FormField/FormField'
import useSettingsStore from '@stores/useSettingsStore'
import './PricingSettings.css'

const SEASONS = [
    { id: 'low',  label: 'Χαμηλή Σεζόν'  },
    { id: 'mid',  label: 'Μεσαία Σεζόν'  },
    { id: 'high', label: 'Υψηλή Σεζόν'   },
]

const ROOM_TYPES = ['Μονόκλινο', 'Δίκλινο', 'Τρίκλινο', 'Οικογενειακό']

function PricingSettings() {
    const { pricing, updatePricing } = useSettingsStore()

    return (
        <div className="pricing-settings">
            {SEASONS.map((season) => (
                <div key={season.id} className="pricing-settings__season">
                    <div className="pricing-settings__season-title">{season.label}</div>
                    <div className="pricing-settings__grid">
                        {ROOM_TYPES.map((type) => (
                            <FormField key={type} label={type}>
                                <input
                                    type="number"
                                    className="form-field__input"
                                    value={pricing[season.id][type]}
                                    onChange={(e) =>
                                        updatePricing(season.id, type, parseFloat(e.target.value) || 0)
                                    }
                                />
                            </FormField>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PricingSettings