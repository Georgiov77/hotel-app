const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {

    // Rooms
    rooms: {
        getAll:        ()                   => ipcRenderer.invoke('rooms:getAll'),
        getAvailable:  (checkIn, checkOut)  => ipcRenderer.invoke('rooms:getAvailable', { checkIn, checkOut }),
        updateStatus:  (id, status)         => ipcRenderer.invoke('rooms:updateStatus', { id, status }),
    },

    // Guests
    guests: {
        getAll:   ()              => ipcRenderer.invoke('guests:getAll'),
        getById:  (id)            => ipcRenderer.invoke('guests:getById', id),
        search:   (query)         => ipcRenderer.invoke('guests:search', query),
        create:   (guest)         => ipcRenderer.invoke('guests:create', guest),
        update:   (id, guest)     => ipcRenderer.invoke('guests:update', { id, guest }),
        delete:   (id)            => ipcRenderer.invoke('guests:delete', id),
    },

    // Bookings
    bookings: {
        getAll:           ()                  => ipcRenderer.invoke('bookings:getAll'),
        getById:          (id)                => ipcRenderer.invoke('bookings:getById', id),
        getByDateRange:   (from, to)          => ipcRenderer.invoke('bookings:getByDateRange', { from, to }),
        getTodayCheckIns: (today)             => ipcRenderer.invoke('bookings:getTodayCheckIns', today),
        getTodayCheckOuts:(today)             => ipcRenderer.invoke('bookings:getTodayCheckOuts', today),
        create:           (booking, extras)   => ipcRenderer.invoke('bookings:create', { booking, extras }),
        update:           (id, booking)       => ipcRenderer.invoke('bookings:update', { id, booking }),
        updateStatus:     (id, status)        => ipcRenderer.invoke('bookings:updateStatus', { id, status }),
        getExtras:        (bookingId)         => ipcRenderer.invoke('bookings:getExtras', bookingId),
        delete:           (id)                => ipcRenderer.invoke('bookings:delete', id),
    },

    // Settings
    settings: {
        getAll: ()              => ipcRenderer.invoke('settings:getAll'),
        set:    (key, value)    => ipcRenderer.invoke('settings:set', { key, value }),
    },

})