import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RoleProvider from "./component/context/RoleProvider.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RoleProvider>
            <App/>
        </RoleProvider>
    </StrictMode>,
)
