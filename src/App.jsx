import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spinner, Stack } from '@georgevlachos/ui'
import useThemeStore from '@stores/useThemeStore'
import useSettingsStore from '@stores/useSettingsStore'
import useIdleLock from '@features/auth/useIdleLock'
import Layout from '@components/Layout/Layout'
import LockScreen from '@features/auth/LockScreen'

// Κάθε page γίνεται δικό του chunk — φορτώνει μόνο όταν ο χρήστης
// πλοηγηθεί εκεί, αντί όλες οι σελίδες να μπουν στο αρχικό bundle.
const Dashboard = lazy(() => import('@pages/Dashboard/Dashboard'))
const Rooms = lazy(() => import('@pages/Rooms/Rooms'))
const Guests = lazy(() => import('@pages/Guests/Guests'))
const Bookings = lazy(() => import('@pages/Bookings/Bookings'))
const NewBooking = lazy(() => import('@pages/NewBooking/NewBooking'))
const Calendar = lazy(() => import('@pages/Calendar/Calendar'))
const Reports = lazy(() => import('@pages/Reports/Reports'))
const Settings = lazy(() => import('@pages/Settings/Settings'))

function RouteFallback() {
    return (
        <Stack align="center" style={{ padding: '2rem' }}>
            <Spinner size="lg" />
        </Stack>
    )
}

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
                <Suspense fallback={<RouteFallback />}>
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
                </Suspense>
            </Layout>
        </>
    )
}

export default App
