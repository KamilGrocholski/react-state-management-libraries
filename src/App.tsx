import { useState } from 'react'
import './App.css'
import Jotai from './components/StateLibrariesComponents/Jotai'
import Mobx from './components/StateLibrariesComponents/Mobx'
import Redux from './components/StateLibrariesComponents/Redux'
import Valtio from './components/StateLibrariesComponents/Valtio'
import Zustand from './components/StateLibrariesComponents/Zustand'
// import Recoil from './components/StateLibrariesComponents/Recoil'

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
