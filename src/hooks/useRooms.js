import useAsyncResource from './useAsyncResource'
import roomService from '@services/roomService'

function useRooms() {
    const { data: rooms, isLoading, reload } = useAsyncResource(() => roomService.getAll(), [], [])

    return { rooms, isLoading, reload }
}

export default useRooms
