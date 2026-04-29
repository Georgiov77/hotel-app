import Card from '@components/Card/Card'
import Button from '@components/Button/Button'
import Table from '@components/Table/Table'
import useSearch from '@hooks/useSearch'
import guestColumns from './guests.columns'
import { mockGuests } from '@config/mockData'
import './Guests.css'


function Guests() {
    const { search, setSearch, filtered } = useSearch(mockGuests, ['firstName', 'lastName', 'email', 'phone'])

    return (
        <div className="guests">
            <div className="guests__toolbar">
                <div className="guests__search">
                    🔍
                    <input
                        type="text"
                        placeholder="Αναζήτηση πελάτη..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button>+ Νέος Πελάτης</Button>
            </div>
            <Card>
                <Table
                    columns={guestColumns}
                    data={filtered}
                    emptyMessage="Δεν βρέθηκαν πελάτες"
                />
            </Card>
        </div>
    )
}

export default Guests