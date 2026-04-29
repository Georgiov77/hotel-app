export const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('el-GR')
}

export const calcNights = (checkIn, checkOut) => {
    const diff = new Date(checkOut) - new Date(checkIn)
    return Math.round(diff / (1000 * 60 * 60 * 24))
}

export const todayISO = () => new Date().toISOString().split('T')[0]