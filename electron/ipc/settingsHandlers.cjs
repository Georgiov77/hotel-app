const { ipcMain }          = require('electron')
const SettingsRepository   = require('../repositories/SettingsRepository.cjs')

ipcMain.handle('settings:getAll', () => {
    return SettingsRepository.findAll()
})

ipcMain.handle('settings:set', (_, { key, value }) => {
    return SettingsRepository.set(key, value)
})