import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import useThemeStore from '@stores/useThemeStore'
import useSettingsStore from '@stores/useSettingsStore'
import useIdleLock from '@features/auth/useIdleLock'
import Layout from '@components/Layout/Layout'
import LockScreen from '@features/auth/LockScreen'
import Dashboard from '@pages/Dashboard/Dashboard'
import Rooms from '@pages/Rooms/Rooms'
import Guests from '@pages/Guests/Guests'
import Bookings from '@pages/Bookings/Bookings'
import NewBooking from '@pages/NewBooking/NewBooking'
import Calendar from '@pages/Calendar/Calendar'
import Reports from '@pages/Reports/Reports'
import Settings from '@pages/Settings/Settings'

function App() {
    const { theme } = useThemeStore()
    const { load, loaded } = useSettingsStore()
    const { isLocked, lock, unlock } = useIdleLock()

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    useEffect(() => {
        load()
    }, [])

    if (!loaded) return null

    return (
        <>
            {isLocked && <LockScreen onUnlock={unlock} />}
            <Layout onLock={lock}>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/guests" element={<Guests />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/bookings/new" element={<NewBooking />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Layout>
        </>
    )
}

export default App
