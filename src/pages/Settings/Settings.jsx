import Card from '@components/Card/Card'
import HotelSettings from './components/HotelSettings'
import PricingSettings from './components/PricingSettings'
import SecuritySettings from './components/SecuritySettings'
import AppearanceSettings from './components/AppearanceSettings'
import './Settings.css'

function Settings() {
    return (
        <div className="settings">

            <div className="settings__section">
                <div className="settings__section-title">Στοιχεία Ξενοδοχείου</div>
                <Card>
                    <HotelSettings />
                </Card>
            </div>

            <div className="settings__section">
                <div className="settings__section-title">Τιμές Σεζόν</div>
                <Card>
                    <PricingSettings />
                </Card>
            </div>

            <div className="settings__section">
                <div className="settings__section-title">Ασφάλεια</div>
                <Card>
                    <SecuritySettings />
                </Card>
            </div>

            <div className="settings__section">
                <div className="settings__section-title">Εμφάνιση</div>
                <Card>
                    <AppearanceSettings />
                </Card>
            </div>

        </div>
    )
}

export default Settings