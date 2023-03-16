import { Provider } from 'react-redux'
import './App.css'
import Redux from './components/Redux'
import Zustand from './components/Zustand'
import { store } from './stores/redux'
import Valtio from './components/Valtio'
import { useState } from 'react'
import Jotai from './components/Jotai'

const TabsMap = {
    Zustand,
    Redux,
    Valtio,
    Jotai,
} as const

function App() {
    const [activeTab, setActiveTab] = useState('Zustand')

    return (
        <Provider store={store}>
            {/*redux provider*/}
            <div className='App'>
                {Object.keys(TabsMap).map((name) => (
                    <Tab key={name} name={name} changeTab={setActiveTab} />
                ))}
                {Object.entries(TabsMap).map(([name, Panel]) =>
                    name === activeTab ? <Panel key={name} /> : null
                )}
            </div>
        </Provider>
    )
}

const Tab: React.FC<{
    name: string
    changeTab(name: string): void
}> = ({ name, changeTab }) => {
    return <button onClick={() => changeTab(name)}>{name}</button>
}

export default App
