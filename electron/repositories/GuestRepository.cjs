const db = require('../repositories/adapters/sqliteAdapter.cjs')

const GuestRepository = {
    findAll: () => {
        return db.findAll(`
      SELECT * FROM guests
      ORDER BY last_name, first_name
    `)
    },

    findById: (id) => {
        return db.findOne(`
      SELECT * FROM guests
      WHERE id = ?
    `, [id])
    },

    search: (query) => {
        const q = `%${query}%`
        return db.findAll(`
      SELECT * FROM guests
      WHERE first_name LIKE ?
      OR last_name     LIKE ?
      OR email         LIKE ?
      OR phone         LIKE ?
      ORDER BY last_name, first_name
    `, [q, q, q, q])
    },

    create: (guest) => {
        const result = db.run(`
      INSERT INTO guests (first_name, last_name, email, phone, nationality, id_number, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
            guest.firstName,
            guest.lastName,
            guest.email       || '',
            guest.phone       || '',
            guest.nationality || 'GR',
            guest.idNumber    || '',
            guest.notes       || '',
        ])
        return result.lastInsertRowid
    },

    update: (id, guest) => {
        return db.run(`
      UPDATE guests
      SET first_name  = ?,
          last_name   = ?,
          email       = ?,
          phone       = ?,
          nationality = ?,
          id_number   = ?,
          notes       = ?
      WHERE id = ?
    `, [
            guest.firstName,
            guest.lastName,
            guest.email       || '',
            guest.phone       || '',
            guest.nationality || 'GR',
            guest.idNumber    || '',
            guest.notes       || '',
            id,
        ])
    },

    delete: (id) => {
        return db.run(`
      DELETE FROM guests WHERE id = ?
    `, [id])
    },
}

module.exports = GuestRepository