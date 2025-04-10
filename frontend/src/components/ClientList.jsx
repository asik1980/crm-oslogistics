import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/clients'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [editClientId, setEditClientId] = useState(null)
  const [formData, setFormData] = useState({})

  const fetchClients = () => {
    axios.get(API_URL)
      .then(res => setClients(res.data))
      .catch(err => console.error('Błąd pobierania klientów:', err))
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleEdit = (client) => {
    console.log('Klik!', client)
    setEditClientId(client.id)
    setFormData(client)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {

      await axios.put(`${API_URL}/${editClientId}`, formData)
      // aktualizujemy tylko jeden rekord lokalnie
      setClients(prev =>
        prev.map(c => (c.id === editClientId ? { ...c, ...formData } : c))
      )

      setEditClientId(null)
    } catch (err) {
      console.error('Błąd przy edycji klienta:', err)
    }
  }

  const handleBlur = (e) => {
    setTimeout(() => {
      const nextFocus = document.activeElement
      if (
        nextFocus &&
        nextFocus.tagName === 'INPUT' &&
        nextFocus.name in formData &&
        nextFocus !== e.target
      ) {
        // Użytkownik przeszedł do innego inputa — NIE zapisujemy jeszcze
        return
      }
  
      // Inaczej — zapisujemy
      handleSave()
    }, 100)
  }

  const handleDelete = async (id) => {
    if (confirm('Czy na pewno chcesz usunąć tego klienta?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        fetchClients()
      } catch (err) {
        console.error('Błąd przy usuwaniu klienta:', err)
      }
    }
  }

  const renderCell = (client, field) => {
  console.log('renderCell:', editClientId, client.id)
  if (editClientId === client.id) {
      return (
        <input
          type="text"
          name={field}
          value={formData[field] || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave()
            }
          }}
          className="border px-2 py-1 w-full"
          autoFocus
        />
      )
    }
    return (
      <span onClick={() => handleEdit(client)} className="cursor-pointer">
        {client[field]}
      </span>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista klientów</h1>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Imię i nazwisko</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Telefon</th>
            <th className="border px-4 py-2">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="border-b">
              <td className="border px-4 py-2">{client.id}</td>
              <td className="border px-4 py-2">{renderCell(client, 'name')}</td>
              <td className="border px-4 py-2">{renderCell(client, 'email')}</td>
              <td className="border px-4 py-2">{renderCell(client, 'phone')}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(client.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientList

