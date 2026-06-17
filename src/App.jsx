import { useEffect, useRef, useState } from 'react'
import useThemeStore     from '@stores/useThemeStore'
import useSettingsStore  from '@stores/useSettingsStore'
import useIdleLock       from '@features/auth/useIdleLock'
import Layout            from '@components/Layout/Layout'
import LockScreen        from '@features/auth/LockScreen'
import Dashboard         from '@pages/Dashboard/Dashboard'
import Rooms             from '@pages/Rooms/Rooms'
import Guests            from '@pages/Guests/Guests'
import Bookings          from '@pages/Bookings/Bookings'
import NewBooking        from '@pages/NewBooking/NewBooking'
import Calendar          from '@pages/Calendar/Calendar'
import Reports           from '@pages/Reports/Reports'
import Settings          from '@pages/Settings/Settings'

function App() {
    const { theme }                    = useThemeStore()
    const { load, loaded }             = useSettingsStore()
    const { isLocked, lock, unlock }   = useIdleLock()
    const [activePage, setActivePage]  = useState('dashboard')
    const pageDataRef                  = useRef(null)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    useEffect(() => {
        load()
    }, [])

    const handleNavigate = (page, data = null) => {
        pageDataRef.current = data
        setActivePage(page)
    }

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard onNavigate={handleNavigate} />
            case 'rooms':       return <Rooms />
            case 'guests':      return <Guests />
            case 'bookings':    return <Bookings onNavigate={handleNavigate} />
            case 'new-booking': return <NewBooking onNavigate={handleNavigate} initialData={pageDataRef.current} />
            case 'calendar':    return <Calendar onNavigate={handleNavigate} />
            case 'reports':     return <Reports />
            case 'settings':    return <Settings />
            default:            return <div>Σύντομα...</div>
        }
    }

    if (!loaded) return null

    return (
        <>
            {isLocked && <LockScreen onUnlock={unlock} />}
            <Layout activePage={activePage} onNavigate={setActivePage} onLock={lock}>
                {renderPage()}
            </Layout>
        </>
    )
}

export default App