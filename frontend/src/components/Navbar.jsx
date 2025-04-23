import React from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import logo from '../assets/logo.png'

const Navbar = ({ onLogout }) => {
  const token = localStorage.getItem('token')
  let userInfo = null

  if (token) {
    try {
      userInfo = jwtDecode(token)
    } catch (err) {
      console.error('Błąd dekodowania tokena:', err)
    }
  }

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-16" />
        </Link>

        <div className="flex gap-4 ml-6">
          <Link to="/" className="hover:underline">CRM</Link>

          {userInfo?.role === 'ADMIN' && (
            <>
              <Link to="/users" className="hover:underline">Zespół</Link>
              <Link to="/goals" className="hover:underline">Cele</Link>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {userInfo && (
          <span className="text-sm opacity-80 whitespace-nowrap">
            {userInfo.firstName} {userInfo.lastName} ({userInfo.role})
          </span>
        )}
        <button
          onClick={onLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
        >
          Wyloguj
        </button>
      </div>
    </nav>
  )
}

export default Navbar
