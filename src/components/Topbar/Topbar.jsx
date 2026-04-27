import useThemeStore from '@stores/useThemeStore'
import PAGE_TITLES from '@config/pageTitles'
import './Topbar.css'


function Topbar({ activePage }) {
    const { theme, toggleTheme } = useThemeStore()

    return (
        <header className="topbar">
            <h1 className="topbar__title">
                {PAGE_TITLES[activePage]}
            </h1>
            <div className="topbar__actions">
                <button className="topbar__theme-btn" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
            </div>
        </header>
    )
}

export default Topbar