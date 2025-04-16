import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import ClientList from './components/ClientList'
import ClientForm from './components/ClientForm'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [refreshFlag, setRefreshFlag] = useState(0)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  const handleRefreshClients = () => {
    setRefreshFlag(prev => prev + 1)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">CRM OS Logistics</h1>

      {isLoggedIn ? (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Wyloguj
            </button>
          </div>

          <ClientForm onAdded={handleRefreshClients} />
          <ClientList key={refreshFlag} />
        </>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App
