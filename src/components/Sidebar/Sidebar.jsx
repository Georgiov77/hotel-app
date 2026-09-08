// src/components/Sidebar/Sidebar.jsx
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import ROUTES from '@config/routes'
import useSettingsStore from '@stores/useSettingsStore'

function Sidebar() {
    const { hotel } = useSettingsStore()

    return (
        <aside className="sidebar">
            <div className="sidebar__logo">
                <div className="sidebar__logo-title">{hotel.name}</div>
                <div className="sidebar__logo-subtitle">Διαχείριση Ξενοδοχείου</div>
            </div>

            <nav className="sidebar__nav">
                {ROUTES.filter((route) => route.inNav).map((route) => (
                    <NavLink
                        key={route.id}
                        to={route.path}
                        className={({ isActive }) =>
                            `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`
                        }
                    >
                        <span className="sidebar__item-icon">{route.icon}</span>
                        {route.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar
