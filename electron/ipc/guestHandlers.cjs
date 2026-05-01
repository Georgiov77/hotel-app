const { ipcMain }      = require('electron')
const GuestRepository  = require('../repositories/GuestRepository.cjs')

ipcMain.handle('guests:getAll', () => {
    return GuestRepository.findAll()
})

ipcMain.handle('guests:getById', (_, id) => {
    return GuestRepository.findById(id)
})

ipcMain.handle('guests:search', (_, query) => {
    return GuestRepository.search(query)
})

ipcMain.handle('guests:create', (_, guest) => {
    const id = GuestRepository.create(guest)
    return GuestRepository.findById(id)
})

ipcMain.handle('guests:update', (_, { id, guest }) => {
    GuestRepository.update(id, guest)
    return GuestRepository.findById(id)
})

ipcMain.handle('guests:delete', (_, id) => {
    return GuestRepository.delete(id)
})