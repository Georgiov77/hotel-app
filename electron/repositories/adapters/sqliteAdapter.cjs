const { getDb } = require('../../database.cjs')

const sqliteAdapter = {
    // Επιστρέφει πολλές εγγραφές
    findAll: (sql, params = []) => {
        return getDb().prepare(sql).all(params)
    },

    // Επιστρέφει μία εγγραφή
    findOne: (sql, params = []) => {
        return getDb().prepare(sql).get(params)
    },

    // Insert / Update / Delete
    run: (sql, params = []) => {
        return getDb().prepare(sql).run(params)
    },

    // Πολλαπλές εντολές σε transaction
    transaction: (fn) => {
        return getDb().transaction(fn)()
    },
}

module.exports = sqliteAdapter