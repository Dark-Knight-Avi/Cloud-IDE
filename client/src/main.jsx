import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StateContextProvider from './contexts/StateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateContextProvider>
    <App />
    </StateContextProvider>
  </StrictMode>,
)
