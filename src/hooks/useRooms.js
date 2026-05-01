import { useState, useEffect } from 'react'
import roomService     from '@services/roomService'
import { toast }       from '@stores/useToastStore'
import { getErrorMessage } from '@error/errorHandler'

function useRooms() {
    const [rooms,     setRooms]     = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const load = async () => {
        try {
            setIsLoading(true)
            const data = await roomService.getAll()
            setRooms(data)
        } catch (err) {
            toast.error(getErrorMessage(err))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    return { rooms, isLoading, reload: load }
}

export default useRooms