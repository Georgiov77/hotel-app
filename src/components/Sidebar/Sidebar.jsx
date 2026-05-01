// src/components/Sidebar/Sidebar.jsx
import './Sidebar.css'
import NAV_ITEMS from '@config/navigation'
import useSettingsStore from '@stores/useSettingsStore'

function Sidebar({ activePage, onNavigate }) {
    const { hotel } = useSettingsStore()

    return (
        <aside className="sidebar">
            <div className="sidebar__logo">
                <div className="sidebar__logo-title">{hotel.name}</div>
                <div className="sidebar__logo-subtitle">Διαχείριση Ξενοδοχείου</div>
            </div>

            <nav className="sidebar__nav">
                {NAV_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        className={`sidebar__item ${activePage === item.id ? 'sidebar__item--active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <span className="sidebar__item-icon">{item.icon}</span>
                        {item.label}
                    </div>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar