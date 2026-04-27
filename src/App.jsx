// src/App.jsx
import { useState, useEffect } from 'react'

function App() {
    const [theme, setTheme] = useState('light')

    // Εφαρμόζει το theme στο <html> element
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <div>
            <button onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <h1>HotelDesk</h1>
        </div>
    )
}

export default App