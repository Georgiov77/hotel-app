import { useState }    from 'react'
import Card            from '@components/Card/Card'
import Button          from '@components/Button/Button'
import Table           from '@components/Table/Table'
import useGuests       from '@hooks/useGuests'
import guestColumns    from './guests.columns'
import './Guests.css'

function Guests() {
    const { guests, isLoading, search } = useGuests()
    const [query, setQuery] = useState('')

    const handleSearch = (e) => {
        setQuery(e.target.value)
        search(e.target.value)
    }

    if (isLoading) return <div>Φόρτωση...</div>

    return (
        <div className="guests">
            <div className="guests__toolbar">
                <div className="guests__search">
                    🔍
                    <input
                        type="text"
                        placeholder="Αναζήτηση πελάτη..."
                        value={query}
                        onChange={handleSearch}
                    />
                </div>
                <Button>+ Νέος Πελάτης</Button>
            </div>
            <Card>
                <Table
                    columns={guestColumns}
                    data={guests}
                    emptyMessage="Δεν βρέθηκαν πελάτες"
                />
            </Card>
        </div>
    )
}

export default Guests