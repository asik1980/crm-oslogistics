import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ClientsPage from './pages/ClientsPage'
import Navbar from './components/Navbar'
import UsersPage from './pages/UsersPage'
import AdminRoute from './components/AdminRoute'
import { jwtDecode } from 'jwt-decode'
import GoalsPage from './pages/GoalsPage'

const Dashboard = () => <div className="p-6 text-xl">Tu będzie dashboard</div>
const Contacts = () => <div className="p-6 text-xl">Tu będą kontakty</div>

const AppRoutes = ({ onLogout, refreshFlag, handleRefreshClients, user }) => {
  return (
    <>
      <Navbar onLogout={onLogout} user={user} />
      <div className="w-full px-6 py-4">
        <Routes>
          <Route path="/" element={<ClientsPage user={user} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/goals" element={<GoalsPage />} />
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

  const token = localStorage.getItem('token')
  const user = token ? jwtDecode(token) : {}
 
  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <Router>
      <AppRoutes
        onLogout={handleLogout}
        refreshFlag={refreshFlag}
        handleRefreshClients={handleRefreshClients}
        user={user} // ✅ tu przekazujesz user
      />
    </Router>
  )
}

export default App
