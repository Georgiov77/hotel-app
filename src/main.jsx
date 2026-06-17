import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastProvider } from '@georgevlachos/ui'
import '@georgevlachos/ui/styles'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ToastProvider position="bottom-right">
            <App />
        </ToastProvider>
    </React.StrictMode>
)