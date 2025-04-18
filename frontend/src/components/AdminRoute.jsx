import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) return <Navigate to="/" />

  try {
    const { role } = jwtDecode(token)
    if (role !== 'ADMIN') return <Navigate to="/" />
  } catch (e) {
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute
