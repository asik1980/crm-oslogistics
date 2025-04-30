import React, { useState } from 'react'
import axios from 'axios'

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      })

      const token = response.data.access_token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}` // ✅ DODANE

      if (onLoginSuccess) onLoginSuccess()
    } catch (err) {
      setError('Nieprawidłowy email lub hasło')
      console.error('Błąd logowania:', err)
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Zaloguj się</h2>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Hasło"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        Zaloguj
      </button>
    </form>
  )
}

export default LoginForm
