import { useState } from 'react'

function useSearch(data, keys) {
    const [search, setSearch] = useState('')

    const filtered = data.filter((item) => {
        const q = search.toLowerCase()
        return keys.some((key) =>
            String(item[key]).toLowerCase().includes(q)
        )
    })

    return { search, setSearch, filtered }
}

export default useSearch