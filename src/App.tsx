import './App.css'
import Redux from './components/Redux'
import Zustand from './components/Zustand'
import Valtio from './components/Valtio'
import { useReducer, useState } from 'react'
import Jotai from './components/Jotai'
import Recoil from './components/Recoil'
import Mobx from './components/Mobx'

const TabsMap = {
    Zustand,
    Redux,
    Valtio,
    Jotai,
    Mobx,
    // Recoil,
} as const

function App() {
    const [activeTab, setActiveTab] = useState('Zustand')

    return (
        <div className='App'>
            <div className='tabs-container'>
                {Object.keys(TabsMap).map((name) => (
                    <Tab
                        key={name}
                        name={name}
                        changeTab={setActiveTab}
                        isActive={activeTab === name}
                    />
                ))}
            </div>
            {Object.entries(TabsMap).map(([name, Panel]) =>
                name === activeTab ? <Panel key={name} /> : null
            )}
        </div>
    )
}

const Tab: React.FC<{
    name: string
    isActive: boolean
    changeTab(name: string): void
}> = ({ name, changeTab, isActive }) => {
    return (
        <button
            className={isActive ? 'tab-active' : ''}
            onClick={() => changeTab(name)}
        >
            {name}
        </button>
    )
}

export default App
