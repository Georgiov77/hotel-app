// electron/database.cjs
const Database = require('better-sqlite3')
const path     = require('path')
const { app }  = require('electron')

let db

function getDb() {
    if (!db) throw new Error('Database not initialized')
    return db
}

function init() {
    const dbPath = path.join(app.getPath('userData'), 'hoteldesk.db')
    db = new Database(dbPath)

    // Performance settings
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')

    createTables()
}

function createTables() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      number       INTEGER NOT NULL UNIQUE,
      type         TEXT    NOT NULL,
      floor        INTEGER NOT NULL DEFAULT 0,
      capacity     INTEGER NOT NULL DEFAULT 2,
      has_kitchen  INTEGER NOT NULL DEFAULT 0,
      status       TEXT    NOT NULL DEFAULT 'available',
      notes        TEXT    DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS guests (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name  TEXT NOT NULL,
      last_name   TEXT NOT NULL,
      email       TEXT,
      phone       TEXT,
      nationality TEXT DEFAULT 'GR',
      id_number   TEXT,
      notes       TEXT DEFAULT '',
      created_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id        INTEGER NOT NULL REFERENCES rooms(id),
      guest_id       INTEGER NOT NULL REFERENCES guests(id),
      check_in       TEXT    NOT NULL,
      check_out      TEXT    NOT NULL,
      nights         INTEGER NOT NULL DEFAULT 1,
      adults         INTEGER NOT NULL DEFAULT 1,
      children       INTEGER NOT NULL DEFAULT 0,
      status         TEXT    NOT NULL DEFAULT 'confirmed',
      source         TEXT    NOT NULL DEFAULT 'frontdesk',
      price_per_night REAL   NOT NULL DEFAULT 0,
      total_amount   REAL    NOT NULL DEFAULT 0,
      deposit_amount REAL    NOT NULL DEFAULT 0,
      paid_amount    REAL    NOT NULL DEFAULT 0,
      payment_status TEXT    NOT NULL DEFAULT 'unpaid',
      notes          TEXT    DEFAULT '',
      created_at     TEXT    DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS booking_extras (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id  INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
      description TEXT    NOT NULL,
      price_per_day REAL  NOT NULL DEFAULT 0,
      days        INTEGER NOT NULL DEFAULT 1,
      total       REAL    NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS settings (
     key   TEXT PRIMARY KEY,
     value TEXT NOT NULL
    );
  `)
}

module.exports = { init, getDb }