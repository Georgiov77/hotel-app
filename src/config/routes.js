// Ενιαίο source of truth για routing: sidebar nav, topbar title, και router config
// (App.jsx) τροφοδοτούνται όλα από εδώ, ώστε να μην ξεσυγχρονίζονται μεταξύ τους.
const ROUTES = [
    {
        path: '/dashboard',
        id: 'dashboard',
        label: 'Dashboard',
        icon: '📊',
        title: 'Dashboard',
        inNav: true,
    },
    {
        path: '/calendar',
        id: 'calendar',
        label: 'Ημερολόγιο',
        icon: '📅',
        title: 'Ημερολόγιο Κρατήσεων',
        inNav: true,
    },
    {
        path: '/bookings',
        id: 'bookings',
        label: 'Κρατήσεις',
        icon: '🗂️',
        title: 'Κρατήσεις',
        inNav: true,
    },
    { path: '/bookings/new', id: 'new-booking', title: 'Νέα Κράτηση', inNav: false },
    { path: '/guests', id: 'guests', label: 'Πελάτες', icon: '👥', title: 'Πελάτες', inNav: true },
    { path: '/rooms', id: 'rooms', label: 'Δωμάτια', icon: '🚪', title: 'Δωμάτια', inNav: true },
    {
        path: '/reports',
        id: 'reports',
        label: 'Αναφορές',
        icon: '📈',
        title: 'Αναφορές',
        inNav: true,
    },
    {
        path: '/settings',
        id: 'settings',
        label: 'Ρυθμίσεις',
        icon: '⚙️',
        title: 'Ρυθμίσεις',
        inNav: true,
    },
]

export default ROUTES
