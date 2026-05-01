import LockScreen from '@features/auth/LockScreen'
import useIdleLock from '@features/auth/useIdleLock'
import Layout from "@components/Layout/Layout";
import {useEffect, useRef, useState} from "react";
import Dashboard from "@pages/Dashboard/Dashboard";
import Rooms from "@pages/Rooms/Rooms";
import Guests from "@pages/Guests/Guests";
import Bookings from "@pages/Bookings/Bookings";
import NewBooking from "@pages/NewBooking/NewBooking";
import Calendar from "@pages/Calendar/Calendar";
import Reports from "@pages/Reports/Reports";
import Settings from "@pages/Settings/Settings";
import useThemeStore from "@stores/useThemeStore";

function App() {
    const { theme } = useThemeStore()
    const { isLocked, lock, unlock } = useIdleLock()
    const [activePage, setActivePage] = useState('dashboard')
    const pageDataRef = useRef(null)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const handleNavigate = (page, data = null) => {
        pageDataRef.current = data
        setActivePage(page)
    }

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':   return <Dashboard />
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