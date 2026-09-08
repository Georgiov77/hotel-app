export function normalizeRoom(row) {
    if (!row) return row
    return {
        id: row.id,
        number: row.number,
        type: row.type,
        floor: row.floor,
        capacity: row.capacity,
        hasKitchen: row.has_kitchen === 1,
        status: row.status,
        notes: row.notes,
    }
}

export function normalizeGuest(row) {
    if (!row) return row
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        phone: row.phone,
        nationality: row.nationality,
        idNumber: row.id_number,
        notes: row.notes,
        createdAt: row.created_at,
    }
}

export function normalizeBookingExtra(row) {
    if (!row) return row
    return {
        id: row.id,
        bookingId: row.booking_id,
        description: row.description,
        pricePerDay: row.price_per_day,
        days: row.days,
        total: row.total,
    }
}

// Booking rows come from JOINed queries whose selected columns vary by
// query (see BookingRepository.cjs) — joined fields are simply undefined
// when a given query doesn't select them.
export function normalizeBooking(row) {
    if (!row) return row
    return {
        id: row.id,
        roomId: row.room_id,
        guestId: row.guest_id,
        checkIn: row.check_in,
        checkOut: row.check_out,
        nights: row.nights,
        adults: row.adults,
        children: row.children,
        status: row.status,
        source: row.source,
        pricePerNight: row.price_per_night,
        totalAmount: row.total_amount,
        depositAmount: row.deposit_amount,
        paidAmount: row.paid_amount,
        paymentStatus: row.payment_status,
        notes: row.notes,
        createdAt: row.created_at,
        roomNumber: row.room_number,
        roomType: row.room_type,
        roomHasKitchen: row.room_has_kitchen != null ? row.room_has_kitchen === 1 : undefined,
        guestFirstName: row.first_name,
        guestLastName: row.last_name,
        guestEmail: row.email,
        guestPhone: row.phone,
    }
}
