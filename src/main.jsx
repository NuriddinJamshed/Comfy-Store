import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '/src/App.jsx'
import "./i18next"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
