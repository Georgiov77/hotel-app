import useThemeStore from '@stores/useThemeStore'
import './AppearanceSettings.css'

const THEMES = [
    { id: 'light', label: 'Light', icon: '☀️' },
    { id: 'dark',  label: 'Dark',  icon: '🌙' },
]

function AppearanceSettings() {
    const { theme, toggleTheme } = useThemeStore()

    return (
        <div className="appearance-settings">
            <div className="appearance-settings__options">
                {THEMES.map((t) => (
                    <div
                        key={t.id}
                        className={`appearance-settings__option ${theme === t.id ? 'appearance-settings__option--active' : ''}`}
                        onClick={() => theme !== t.id && toggleTheme()}
                    >
                        <span className="appearance-settings__option-icon">{t.icon}</span>
                        <span className="appearance-settings__option-label">{t.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppearanceSettings