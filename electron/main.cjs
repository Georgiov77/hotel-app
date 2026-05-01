const { app, BrowserWindow } = require('electron')
const path     = require('path')
const database = require('./database.cjs')
const seeder   = require('./seeder.cjs')

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