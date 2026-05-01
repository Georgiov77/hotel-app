const { ipcMain }        = require('electron')
const BookingRepository  = require('../repositories/BookingRepository.cjs')

ipcMain.handle('bookings:getAll', () => {
    return BookingRepository.findAll()
})

ipcMain.handle('bookings:getById', (_, id) => {
    return BookingRepository.findById(id)
})

ipcMain.handle('bookings:getByDateRange', (_, { from, to }) => {
    return BookingRepository.findByDateRange(from, to)
})

ipcMain.handle('bookings:getTodayCheckIns', (_, today) => {
    return BookingRepository.findTodayCheckIns(today)
})

ipcMain.handle('bookings:getTodayCheckOuts', (_, today) => {
    return BookingRepository.findTodayCheckOuts(today)
})

ipcMain.handle('bookings:create', (_, { booking, extras }) => {
    const id = BookingRepository.create(booking, extras)
    return BookingRepository.findById(id)
})

ipcMain.handle('bookings:update', (_, { id, booking }) => {
    BookingRepository.update(id, booking)
    return BookingRepository.findById(id)
})

ipcMain.handle('bookings:updateStatus', (_, { id, status }) => {
    return BookingRepository.updateStatus(id, status)
})

ipcMain.handle('bookings:getExtras', (_, bookingId) => {
    return BookingRepository.findExtras(bookingId)
})

ipcMain.handle('bookings:delete', (_, id) => {
    return BookingRepository.delete(id)
})