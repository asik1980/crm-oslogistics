import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ClientsPage from './pages/ClientsPage'
import Navbar from './components/Navbar'
import UsersPage from './pages/UsersPage'
import AdminRoute from './components/AdminRoute'
import { jwtDecode } from 'jwt-decode'

const Dashboard = () => <div className="p-6 text-xl">Tu będzie dashboard</div>
const Contacts = () => <div className="p-6 text-xl">Tu będą kontakty</div>

const AppRoutes = ({ onLogout, refreshFlag, handleRefreshClients }) => {
  return (
    <>
      <Navbar onLogout={onLogout} />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<ClientsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route
            path="/users"
            element={
              <AdminRoute>
                <UsersPage />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </>
  )
}

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

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <Router>
      <AppRoutes
        onLogout={handleLogout}
        refreshFlag={refreshFlag}
        handleRefreshClients={handleRefreshClients}
      />
    </Router>
  )
}

export default App
