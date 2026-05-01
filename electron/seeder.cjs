const { getDb } = require('./database.cjs')

const ROOMS = [
    // Ισόγειο
    { number: 13, type: 'Οικογενειακό', floor: 0, capacity: 4, has_kitchen: 1 },
    { number: 14, type: 'Οικογενειακό', floor: 0, capacity: 4, has_kitchen: 1 },

    // 1ος Όροφος
    { number: 1,  type: 'Τρίκλινο',    floor: 1, capacity: 3, has_kitchen: 1 },
    { number: 2,  type: 'Τρίκλινο',    floor: 1, capacity: 3, has_kitchen: 1 },
    { number: 3,  type: 'Δίκλινο',     floor: 1, capacity: 2, has_kitchen: 0 },
    { number: 4,  type: 'Δίκλινο',     floor: 1, capacity: 2, has_kitchen: 1 },
    { number: 5,  type: 'Δίκλινο',     floor: 1, capacity: 2, has_kitchen: 1 },
    { number: 6,  type: 'Τρίκλινο',    floor: 1, capacity: 3, has_kitchen: 1 },

    // 2ος Όροφος
    { number: 7,  type: 'Τρίκλινο',    floor: 2, capacity: 3, has_kitchen: 0 },
    { number: 8,  type: 'Δίκλινο',     floor: 2, capacity: 2, has_kitchen: 0 },
    { number: 9,  type: 'Δίκλινο',     floor: 2, capacity: 2, has_kitchen: 0 },
    { number: 10, type: 'Δίκλινο',     floor: 2, capacity: 2, has_kitchen: 0 },
    { number: 11, type: 'Δίκλινο',     floor: 2, capacity: 2, has_kitchen: 0 },
]

function seed() {
    const db = getDb()

    // Τρέχει μόνο αν δεν υπάρχουν ήδη δωμάτια
    const count = db.prepare('SELECT COUNT(*) as c FROM rooms').get().c
    if (count > 0) return

    const insert = db.prepare(`
    INSERT INTO rooms (number, type, floor, capacity, has_kitchen, status, notes)
    VALUES (@number, @type, @floor, @capacity, @has_kitchen, 'available', '')
  `)

    const insertMany = db.transaction((rooms) => {
        rooms.forEach((room) => insert.run(room))
    })

    insertMany(ROOMS)
    console.log('✓ Seeded 13 rooms')
}

module.exports = { seed }