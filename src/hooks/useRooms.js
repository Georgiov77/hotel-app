import { useState, useEffect } from 'react'
import { useToast }        from '@georgevlachos/ui'
import roomService         from '@services/roomService'
import { getErrorMessage } from '@error/errorHandler'

function useRooms() {
    const { showToast } = useToast()

    const [rooms,     setRooms]     = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const load = async () => {
        try {
            setIsLoading(true)
            const data = await roomService.getAll()
            setRooms(data)
        } catch (err) {
            showToast({ message: getErrorMessage(err), variant: 'danger' })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    return { rooms, isLoading, reload: load }
}

export default useRooms