const db = require('../repositories/adapters/sqliteAdapter.cjs')

const BookingRepository = {
    findAll: () => {
        return db.findAll(`
      SELECT b.*,
        r.number      as room_number,
        r.type        as room_type,
        r.has_kitchen as room_has_kitchen,
        g.first_name,
        g.last_name,
        g.email,
        g.phone
      FROM bookings b
      JOIN rooms  r ON b.room_id  = r.id
      JOIN guests g ON b.guest_id = g.id
      ORDER BY b.check_in DESC
    `)
    },

    findById: (id) => {
        return db.findOne(`
      SELECT b.*,
        r.number      as room_number,
        r.type        as room_type,
        r.has_kitchen as room_has_kitchen,
        g.first_name,
        g.last_name,
        g.email,
        g.phone
      FROM bookings b
      JOIN rooms  r ON b.room_id  = r.id
      JOIN guests g ON b.guest_id = g.id
      WHERE b.id = ?
    `, [id])
    },

    findByDateRange: (from, to) => {
        return db.findAll(`
      SELECT b.*,
        r.number  as room_number,
        r.type    as room_type,
        g.first_name,
        g.last_name,
        g.phone
      FROM bookings b
      JOIN rooms  r ON b.room_id  = r.id
      JOIN guests g ON b.guest_id = g.id
      WHERE b.check_in  < ?
      AND   b.check_out > ?
      AND   b.status   != 'cancelled'
      ORDER BY b.check_in
    `, [to, from])
    },

    findTodayCheckIns: (today) => {
        return db.findAll(`
      SELECT b.*,
        r.number as room_number,
        g.first_name,
        g.last_name
      FROM bookings b
      JOIN rooms  r ON b.room_id  = r.id
      JOIN guests g ON b.guest_id = g.id
      WHERE b.check_in = ?
      AND   b.status  != 'cancelled'
    `, [today])
    },

    findTodayCheckOuts: (today) => {
        return db.findAll(`
      SELECT b.*,
        r.number as room_number,
        g.first_name,
        g.last_name
      FROM bookings b
      JOIN rooms  r ON b.room_id  = r.id
      JOIN guests g ON b.guest_id = g.id
      WHERE b.check_out = ?
      AND   b.status   != 'cancelled'
    `, [today])
    },

    create: (booking, extras = []) => {
        return db.transaction(() => {
            const result = db.run(`
        INSERT INTO bookings (
          room_id, guest_id, check_in, check_out, nights,
          adults, children, status, source,
          price_per_night, total_amount, deposit_amount,
          paid_amount, payment_status, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
                booking.roomId,
                booking.guestId,
                booking.checkIn,
                booking.checkOut,
                booking.nights,
                booking.adults,
                booking.children,
                booking.status        || 'confirmed',
                booking.source        || 'frontdesk',
                booking.pricePerNight,
                booking.totalAmount,
                booking.depositAmount,
                booking.paidAmount    || 0,
                booking.paymentStatus || 'unpaid',
                booking.notes         || '',
            ])

            const bookingId = result.lastInsertRowid

            // Αποθήκευση extras
            extras.forEach((extra) => {
                db.run(`
          INSERT INTO booking_extras (booking_id, description, price_per_day, days, total)
          VALUES (?, ?, ?, ?, ?)
        `, [bookingId, extra.description, extra.pricePerDay, extra.days, extra.total])
            })

            return bookingId
        })
    },

    update: (id, booking) => {
        return db.run(`
      UPDATE bookings
      SET room_id         = ?,
          guest_id        = ?,
          check_in        = ?,
          check_out       = ?,
          nights          = ?,
          adults          = ?,
          children        = ?,
          status          = ?,
          source          = ?,
          price_per_night = ?,
          total_amount    = ?,
          deposit_amount  = ?,
          paid_amount     = ?,
          payment_status  = ?,
          notes           = ?
      WHERE id = ?
    `, [
            booking.roomId,
            booking.guestId,
            booking.checkIn,
            booking.checkOut,
            booking.nights,
            booking.adults,
            booking.children,
            booking.status,
            booking.source,
            booking.pricePerNight,
            booking.totalAmount,
            booking.depositAmount,
            booking.paidAmount,
            booking.paymentStatus,
            booking.notes || '',
            id,
        ])
    },

    updateStatus: (id, status) => {
        return db.run(`
      UPDATE bookings SET status = ?
      WHERE id = ?
    `, [status, id])
    },

    findExtras: (bookingId) => {
        return db.findAll(`
      SELECT * FROM booking_extras
      WHERE booking_id = ?
    `, [bookingId])
    },

    delete: (id) => {
        return db.run(`
      UPDATE bookings SET status = 'cancelled'
      WHERE id = ?
    `, [id])
    },
}

module.exports = BookingRepository