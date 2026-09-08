import Sidebar from '@components/Sidebar/Sidebar'
import Topbar from '@components/Topbar/Topbar'
import './Layout.css'

function Layout({ children, onLock }) {
    return (
        <div className="layout">
            <Topbar onLock={onLock} />
            <div className="layout__body">
                <Sidebar />
                <main className="layout__content">{children}</main>
            </div>
        </div>
    )
}

export default Layout
