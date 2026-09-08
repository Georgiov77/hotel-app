const { ipcMain }      = require('electron')
const RoomRepository   = require('../../backend/repositories/RoomRepository.cjs')
const { validateRoomStatus } = require('../../backend/validation.cjs')

ipcMain.handle('rooms:getAll', () => {
    return RoomRepository.findAll()
})

ipcMain.handle('rooms:getAvailable', (_, { checkIn, checkOut }) => {
    return RoomRepository.findAvailable(checkIn, checkOut)
})

ipcMain.handle('rooms:updateStatus', (_, { id, status }) => {
    validateRoomStatus(status)
    return RoomRepository.updateStatus(id, status)
})