import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.less'
import './styles/tailwind.css'
import './i18n.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
