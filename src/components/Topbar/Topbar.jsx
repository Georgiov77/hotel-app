import { useLocation } from 'react-router-dom'
import useThemeStore from '@stores/useThemeStore'
import ROUTES from '@config/routes'
import './Topbar.css'

function Topbar({ onLock }) {
    const { theme, toggleTheme } = useThemeStore()
    const { pathname } = useLocation()
    const title = ROUTES.find((route) => route.path === pathname)?.title ?? ''

    return (
        <header className="topbar">
            <h1 className="topbar__title">{title}</h1>
            <div className="topbar__actions">
                <button className="topbar__theme-btn" onClick={onLock}>
                    🔒
                </button>
                <button className="topbar__theme-btn" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
            </div>
        </header>
    )
}

export default Topbar
