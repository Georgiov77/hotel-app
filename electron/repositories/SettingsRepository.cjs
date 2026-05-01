const db = require('../repositories/adapters/sqliteAdapter.cjs')

const DEFAULT_SETTINGS = {
    hotel: JSON.stringify({
        name:    'HotelDesk',
        address: '',
        phone:   '',
        email:   '',
        afm:     '',
    }),
    pricing: JSON.stringify({
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
    }),
    security: JSON.stringify({
        pin:         '1234',
        idleTimeout: 10,
    }),
}

const SettingsRepository = {
    // Φορτώνει όλα τα settings
    findAll: () => {
        const rows = db.findAll('SELECT key, value FROM settings')

        // Αν δεν υπάρχουν settings → επιστρέφει defaults
        if (!rows.length) return SettingsRepository.initDefaults()

        return rows.reduce((acc, row) => {
            acc[row.key] = JSON.parse(row.value)
            return acc
        }, {})
    },

    // Αποθηκεύει ένα setting
    set: (key, value) => {
        return db.run(`
      INSERT INTO settings (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `, [key, JSON.stringify(value)])
    },

    // Αρχικοποιεί τα default settings
    initDefaults: () => {
        db.transaction(() => {
            Object.entries(DEFAULT_SETTINGS).forEach(([key, value]) => {
                db.run(`
          INSERT OR IGNORE INTO settings (key, value)
          VALUES (?, ?)
        `, [key, value])
            })
        })

        return Object.entries(DEFAULT_SETTINGS).reduce((acc, [key, value]) => {
            acc[key] = JSON.parse(value)
            return acc
        }, {})
    },
}

module.exports = SettingsRepository