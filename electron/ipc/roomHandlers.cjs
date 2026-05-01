const { ipcMain }      = require('electron')
const RoomRepository   = require('../repositories/RoomRepository.cjs')

ipcMain.handle('rooms:getAll', () => {
    return RoomRepository.findAll()
})

ipcMain.handle('rooms:getAvailable', (_, { checkIn, checkOut }) => {
    return RoomRepository.findAvailable(checkIn, checkOut)
})

ipcMain.handle('rooms:updateStatus', (_, { id, status }) => {
    return RoomRepository.updateStatus(id, status)
})