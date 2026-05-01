// src/stores/useSettingsStore.js
import { create }    from 'zustand'
import settingsService from '../services/settingsService'

const useSettingsStore = create((set, get) => ({
    hotel:    { name: 'HotelDesk', address: '', phone: '', email: '', afm: '' },
    pricing:  {},
    security: { pin: '1234', idleTimeout: 10 },
    loaded:   false,

    // Φορτώνει από SQLite
    load: async () => {
        const settings = await settingsService.getAll()
        set({ ...settings, loaded: true })
    },

    // Αποθηκεύει στο SQLite
    updateHotel: async (fields) => {
        const hotel = { ...get().hotel, ...fields }
        await settingsService.set('hotel', hotel)
        set({ hotel })
    },

    updatePricing: async (season, type, value) => {
        const pricing = {
            ...get().pricing,
            [season]: { ...get().pricing[season], [type]: value },
        }
        await settingsService.set('pricing', pricing)
        set({ pricing })
    },

    updateSecurity: async (fields) => {
        const security = { ...get().security, ...fields }
        await settingsService.set('security', security)
        set({ security })
    },
}))

export default useSettingsStore