import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useSettingsStore = create(
    persist(
        (set) => ({
            // Ξενοδοχείο
            hotel: {
                name:    'HotelDesk',
                address: '',
                phone:   '',
                email:   '',
                afm:     '',
            },

            // Τιμές ανά σεζόν και τύπο δωματίου
            pricing: {
                low: {
                    'Μονόκλινο':    40,
                    'Δίκλινο':      60,
                    'Τρίκλινο':     75,
                    'Οικογενειακό': 100,
                },
                mid: {
                    'Μονόκλινο':    50,
                    'Δίκλινο':      70,
                    'Τρίκλινο':     90,
                    'Οικογενειακό': 120,
                },
                high: {
                    'Μονόκλινο':    65,
                    'Δίκλινο':      90,
                    'Τρίκλινο':     115,
                    'Οικογενειακό': 155,
                },
            },

            // Ασφάλεια
            security: {
                pin:         '1234',
                idleTimeout: 10,
            },

            // Actions
            updateHotel:    (fields) => set((s) => ({ hotel:    { ...s.hotel,    ...fields } })),
            updatePricing:  (season, type, value) => set((s) => ({
                pricing: {
                    ...s.pricing,
                    [season]: {
                        ...s.pricing[season],
                        [type]: value,
                    }
                }
            })),
            updateSecurity: (fields) => set((s) => ({ security: { ...s.security, ...fields } })),
        }),
        { name: 'hotel-settings' }
    )
)

export default useSettingsStore