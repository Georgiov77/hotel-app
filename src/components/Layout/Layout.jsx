import Sidebar from '@components/Sidebar/Sidebar'
import Topbar from '@components/Topbar/Topbar'
import './Layout.css'

function Layout({ children, activePage, onNavigate }) {
    return (
        <div className="layout">
            <Topbar activePage={activePage} />
            <div className="layout__body">
                <Sidebar activePage={activePage} onNavigate={onNavigate} />
                <main className="layout__content">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout