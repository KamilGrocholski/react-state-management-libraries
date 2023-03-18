import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RecoilRoot } from 'recoil'
import { store } from './stores/redux'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </Provider>
    </React.StrictMode>
)
