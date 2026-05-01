const db = require('../repositories/adapters/sqliteAdapter.cjs')

const RoomRepository = {
    findAll: () => {
        return db.findAll(`
      SELECT * FROM rooms
      ORDER BY floor, number
    `)
    },

    findById: (id) => {
        return db.findOne(`
      SELECT * FROM rooms
      WHERE id = ?
    `, [id])
    },

    findAvailable: (checkIn, checkOut) => {
        return db.findAll(`
      SELECT r.* FROM rooms r
      WHERE r.status = 'available'
      AND r.id NOT IN (
        SELECT b.room_id FROM bookings b
        WHERE b.status NOT IN ('cancelled', 'checked_out')
        AND b.check_in  < ?
        AND b.check_out > ?
      )
      ORDER BY r.floor, r.number
    `, [checkOut, checkIn])
    },

    updateStatus: (id, status) => {
        return db.run(`
      UPDATE rooms SET status = ?
      WHERE id = ?
    `, [status, id])
    },
}

module.exports = RoomRepository