// electron/preload.js
const { contextBridge } = require('electron')

// Προς το παρόν άδειο.
// Εδώ θα προσθέσουμε σταδιακά τα API calls:
// - bookings
// - guests
// - rooms
// - κλπ
contextBridge.exposeInMainWorld('api', {})