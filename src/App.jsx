import { useEffect, useState } from 'react'
import useThemeStore from './stores/useThemeStore'
import Layout from '@components/Layout/Layout'
import Dashboard from '@pages/Dashboard/Dashboard'
import Rooms from "@pages/Rooms/Rooms";
import Guests from "@pages/Guests/Guests";
import Bookings from "@pages/Bookings/Bookings";
import NewBooking from "@pages/NewBooking/NewBooking";
import Calendar from "@pages/Calendar/Calendar";
import Reports from "@pages/Reports/Reports";
import Settings from "@pages/Settings/Settings";

function App() {
    const { theme } = useThemeStore()
    const [activePage, setActivePage] = useState('dashboard')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const [pageData, setPageData] = useState(null)

    const handleNavigate = (page, data = null) => {
        setActivePage(page)
        setPageData(data)
    }

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':   return <Dashboard />
            case 'rooms':       return <Rooms />
            case 'guests':      return <Guests />
            case 'bookings':    return <Bookings onNavigate={handleNavigate} />
            case 'new-booking': return <NewBooking onNavigate={handleNavigate} initialData={pageData} />
            case 'calendar':    return <Calendar onNavigate={handleNavigate} />
            case 'reports':     return <Reports />
            case 'settings':    return <Settings />
            default:            return <div>Σύντομα...</div>
        }
    }

    return (
        <Layout activePage={activePage} onNavigate={setActivePage}>
            {renderPage()}
        </Layout>
    )
}

export default App