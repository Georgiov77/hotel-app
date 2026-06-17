import { Input } from '@georgevlachos/ui'
import useSettingsStore from '@stores/useSettingsStore'
import './PricingSettings.css'

const SEASONS = [
    { id: 'low',  label: 'Χαμηλή Σεζόν' },
    { id: 'mid',  label: 'Μεσαία Σεζόν' },
    { id: 'high', label: 'Υψηλή Σεζόν'  },
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
                            <Input
                                key={type}
                                label={type}
                                type="number"
                                value={pricing[season.id][type]}
                                onChange={(e) =>
                                    updatePricing(season.id, type, parseFloat(e.target.value) || 0)
                                }
                                fullWidth
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PricingSettings