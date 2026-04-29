import { useEffect, useState } from 'react'
import useThemeStore from './stores/useThemeStore'
import Layout from '@components/Layout/Layout'
import Dashboard from '@pages/Dashboard/Dashboard'
import Rooms from "@pages/Rooms/Rooms";
import Guests from "@pages/Guests/Guests";
import Bookings from "@pages/Bookings/Bookings";

function App() {
    const { theme } = useThemeStore()
    const [activePage, setActivePage] = useState('dashboard')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard />
            case 'rooms':     return <Rooms />
            case 'guests': return <Guests />
            case 'bookings': return <Bookings />
            default:          return <div>Σύντομα...</div>
        }
    }

    return (
        <Layout activePage={activePage} onNavigate={setActivePage}>
            {renderPage()}
        </Layout>
    )
}

export default App