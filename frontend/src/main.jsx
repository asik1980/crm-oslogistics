import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios' // ✅ dodaj

import './index.css'
import App from './App.jsx'

// ✅ Ustaw token JWT globalnie, jeśli istnieje
const token = localStorage.getItem('token')
console.log('TOKEN:', token)

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
