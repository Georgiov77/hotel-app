import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ToastProvider } from '@georgevlachos/ui'
import '@georgevlachos/ui/styles'
import App from './App.jsx'
import './index.css'

// HashRouter (όχι BrowserRouter) — το production build σερβίρεται από
// file://, όπου το History API δεν λειτουργεί σωστά.
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter>
            <ToastProvider position="bottom-right">
                <App />
            </ToastProvider>
        </HashRouter>
    </React.StrictMode>
)
