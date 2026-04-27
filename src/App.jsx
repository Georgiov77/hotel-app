import { useEffect, useState } from 'react'
import useThemeStore from './stores/useThemeStore'
import Layout from '@components/Layout/Layout'
import Button from '@components/Button/Button'
import Card from "@components/Card/Card";

function App() {
    const { theme } = useThemeStore()
    const [activePage, setActivePage] = useState('dashboard')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <Layout activePage={activePage} onNavigate={setActivePage}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Card
                    title="Κρατήσεις"
                    actions={<Button size="sm">+ Νέα</Button>}
                    footer={<Button variant="secondary">Προβολή όλων</Button>}
                >
                    <p>Περιεχόμενο εδώ</p>
                </Card>
            </div>
        </Layout>
    )
}

export default App