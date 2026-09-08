const { app, BrowserWindow } = require('electron')
const path     = require('path')
const database = require('./database.cjs')
const seeder   = require('../backend/seeder.cjs')

// IPC Handlers
require('./ipc/roomHandlers.cjs')
require('./ipc/guestHandlers.cjs')
require('./ipc/bookingHandlers.cjs')
require('./ipc/settingsHandlers.cjs')

const isDev = process.env.NODE_ENV === 'development'

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 900,
        minHeight: 600,
        title: 'HotelDesk',
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    })

    if (isDev) {
        win.loadURL('http://localhost:5173')
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'))
    }
}

// Αποτρέπει διπλό άνοιγμα του app πάνω στο ίδιο SQLite αρχείο
// (π.χ. διπλό κλικ στο icon) — δεύτερη προσπάθεια απλά φέρνει το υπάρχον window μπροστά.
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', () => {
        const win = BrowserWindow.getAllWindows()[0]
        if (win) {
            if (win.isMinimized()) win.restore()
            win.focus()
        }
    })

    app.whenReady().then(() => {
        database.init()
        seeder.seed()
        createWindow()

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
}