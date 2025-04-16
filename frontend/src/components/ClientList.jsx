import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/clients'

const ClientList = () => {
  const [clients, setClients] = useState([])

  const fetchClients = () => {
    axios.get(API_URL)
      .then(res => {
        console.log('Dane z backendu:', res.data)
        setClients(res.data)
      })
      .catch(err => {
        console.error('Błąd pobierania klientów:', err)
      })
  }

  useEffect(() => {
    fetchClients()
  }, [])

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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm text-left bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Firma</th>
            <th className="border px-4 py-2">Miasto</th>
            <th className="border px-4 py-2">Kod / Adres</th>
            <th className="border px-4 py-2">NIP</th>
            <th className="border px-4 py-2">Email / Telefon</th>
            <th className="border px-4 py-2">Strona www</th>
            <th className="border px-4 py-2">Zainteresowania</th>
            <th className="border px-4 py-2">Tagi</th>
            <th className="border px-4 py-2 text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="border-b hover:bg-gray-50">
              <td className="border px-4 py-2 font-semibold">{client.name}</td>
              <td className="border px-4 py-2">{client.city}</td>
              <td className="border px-4 py-2">{client.zipCode} <br /> {client.address}</td>
              <td className="border px-4 py-2">{client.nip}</td>
              <td className="border px-4 py-2">
                {client.email}<br />
                {client.phone}
              </td>
              <td className="border px-4 py-2">{client.website}</td>
              <td className="border px-4 py-2">
                {client.interestedFCL && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mr-1">FCL</span>}
                {client.interestedLCL && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded mr-1">LCL</span>}
                {client.interestedAIR && <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded mr-1">AIR</span>}
              </td>
              <td className="border px-4 py-2">
                {client.isImporter && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mr-1">Importer</span>}
                {client.isExporter && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded mr-1">Eksporter</span>}
                {client.fromChina && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mr-1">Chiny</span>}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(client.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
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
