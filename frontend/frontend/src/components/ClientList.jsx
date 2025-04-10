import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/clients'

const ClientList = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setClients(res.data))
      .catch(err => console.error('Błąd pobierania klientów:', err))
  }, [])

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
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="border-b">
              <td className="border px-4 py-2">{client.id}</td>
              <td className="border px-4 py-2">{client.name}</td>
              <td className="border px-4 py-2">{client.email}</td>
              <td className="border px-4 py-2">{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientList
