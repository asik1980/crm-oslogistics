import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Toast from '../components/Toast'

const API_URL = 'http://localhost:3000/users'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [toastMessage, setToastMessage] = useState(null)
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'HANDLOWIEC',
  })

  const fetchUsers = () => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    axios.get(API_URL)
      .then(res => setUsers(res.data))
      .catch(err => console.error('Błąd pobierania użytkowników:', err))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreate = async () => {
    try {
      await axios.post(API_URL, newUser)
      setNewUser({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        role: 'HANDLOWIEC',
      })
      fetchUsers()
    } catch (err) {
      console.error('Błąd przy dodawaniu użytkownika:', err)
    }
  }

  const handleUpdate = async (id, field, value) => {
    try {
      await axios.put(`${API_URL}/${id}`, { [field]: value })
      fetchUsers()
    } catch (err) {
      console.error('Błąd przy edycji użytkownika:', err)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = confirm('Czy na pewno chcesz usunąć tego użytkownika?')
    if (!confirmed) return

    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchUsers()
    } catch (err) {
      console.error('Błąd przy usuwaniu użytkownika:', err)
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Zarządzanie użytkownikami</h1>

      {/* ➕ FORMULARZ DODAWANIA */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 bg-white p-4 rounded shadow">
        <input type="text" placeholder="Imię" className="border p-2"
          value={newUser.firstName}
          onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
        />
        <input type="text" placeholder="Nazwisko" className="border p-2"
          value={newUser.lastName}
          onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
        />
        <input type="text" placeholder="Telefon" className="border p-2"
          value={newUser.phone}
          onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <input type="email" placeholder="Email" className="border p-2"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input type="password" placeholder="Hasło" className="border p-2"
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select className="border p-2"
          value={newUser.role}
          onChange={e => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="HANDLOWIEC">HANDLOWIEC</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-2 md:col-span-1">
          ➕ Dodaj użytkownika
        </button>
      </div>

      {/* 👁 LISTA UŻYTKOWNIKÓW */}
      <table className="min-w-full border text-sm text-left bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Imię i nazwisko</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Hasło</th>
            <th className="border px-4 py-2">Telefon</th>
            <th className="border px-4 py-2">Rola</th>
            <th className="border px-4 py-2 text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="border px-4 py-2">
                <input
                  type="text"
                  defaultValue={`${user.firstName || ''} ${user.lastName || ''}`}
                  onBlur={e => {
                    const [firstName, ...rest] = e.target.value.split(' ')
                    const lastName = rest.join(' ')
                    handleUpdate(user.id, 'firstName', firstName)
                    handleUpdate(user.id, 'lastName', lastName)
                  }}
                  className="w-full border px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  defaultValue={user.email}
                  onBlur={e => handleUpdate(user.id, 'email', e.target.value)}
                  className="w-full border px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2 flex items-center gap-2">
                <input
                  type="password"
                  placeholder="Nowe hasło"
                  value={user._newPassword || ''}
                  onChange={(e) => {
                    const val = e.target.value
                    setUsers(prev =>
                      prev.map(u =>
                        u.id === user.id ? { ...u, _newPassword: val } : u
                      )
                    )
                  }}
                  className="border px-2 py-1 w-full"
                />
                <button
                  onClick={() => {
                    if (user._newPassword?.trim()) {
                      handleUpdate(user.id, 'password', user._newPassword)
                      setUsers(prev =>
                        prev.map(u =>
                          u.id === user.id ? { ...u, _newPassword: '' } : u
                        )
                      )
                      setToastMessage('Hasło zaktualizowane!')
                      setTimeout(() => setToastMessage(null), 3000)
                    }
                  }}
                  disabled={!user._newPassword}
                  className={`text-xs px-2 py-1 rounded ${
                    user._newPassword
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Zmień
                </button>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  defaultValue={user.phone}
                  onBlur={e => handleUpdate(user.id, 'phone', e.target.value)}
                  className="w-full border px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2">
                <select
                  defaultValue={user.role}
                  onBlur={e => handleUpdate(user.id, 'role', e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="HANDLOWIEC">HANDLOWIEC</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  )
}

export default UsersPage
