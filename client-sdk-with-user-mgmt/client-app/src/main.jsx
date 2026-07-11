import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Dynamically inject the Sivi SDK script so values are set from env at build/dev time
// without relying on Vite's %VAR% substitution in index.html (which can fail
// if .env is missing and leaves invalid percent-encoding like %S in the URL).
const email = import.meta.env.SIVI_ACCOUNT_EMAIL || ''
const sdkUrl = import.meta.env.SIVI_SDK_URL || 'http://localhost:4848/script.js'
const existing = document.querySelector('script[data-sivi-sdk]')

if (!existing && email) {
  const script = document.createElement('script')
  script.src = `${sdkUrl}?namespace=SIVI&accountEmail=${encodeURIComponent(email)}`
  script.async = true
  script.dataset.siviSdk = 'true'
  document.body.appendChild(script)
} else if (!email) {
  console.warn('[SiviSDK] SIVI_ACCOUNT_EMAIL is not set. Create a .env file from .env.example.')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
