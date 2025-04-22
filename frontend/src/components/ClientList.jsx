import React from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const tagColors = {
  FCL: 'bg-blue-100 text-blue-700',
  LCL: 'bg-purple-100 text-purple-700',
  AIR: 'bg-teal-100 text-teal-700',
  FTL: 'bg-orange-100 text-orange-700',
  RAIL: 'bg-indigo-100 text-indigo-700',
  Importer: 'bg-green-100 text-green-700',
  Eksporter: 'bg-yellow-100 text-yellow-700',
  Chiny: 'bg-red-100 text-red-700',
}

const Tag = ({ text }) => (
  <span className={`text-xs px-2 py-1 rounded ${tagColors[text] || 'bg-gray-100 text-gray-700'}`}>
    {text}
  </span>
)

const ClientList = ({ clients = [], onDelete, onEdit }) => {
  const token = localStorage.getItem('token')
  const decoded = token ? jwtDecode(token) : {}
  const userRole = decoded.role

  const handleDelete = async (id) => {
    if (confirm('Czy na pewno chcesz usunąć tego klienta?')) {
      try {
        await axios.delete(`http://localhost:3000/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        onDelete?.()
      } catch (err) {
        console.error('Błąd przy usuwaniu klienta:', err)
      }
    }
  }

  const handleUpdate = async (id, field, value) => {
    try {
      await axios.put(`http://localhost:3000/clients/${id}`, {
        [field]: value
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      onDelete?.()
    } catch (err) {
      console.error('Błąd przy aktualizacji klienta:', err)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-fixed w-full border text-sm text-left bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 w-[120px]">Firma</th>
            <th className="border px-4 py-2 w-[120px]">Produkty</th>
            <th className="border px-4 py-2 w-[120px]">Tagi</th>
            <th className="border px-4 py-2 w-[50px]">Status</th>
            <th className="border px-4 py-2 w-[100px] text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="border-b hover:bg-gray-50">
              <td className="border px-4 py-2  w-[120px] font-semibold">
                <div className="flex items-center gap-2">
                  <span>{client.name}</span>
                  <button
                    onClick={() => onEdit?.(client)}
                    title="Edytuj klienta"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    ✏️
                  </button>
                </div>
              </td>

              <td className="border px-4 py-2 space-x-1 w-[120px]">
                {client.interestedFCL && <Tag text="FCL" />}
                {client.interestedLCL && <Tag text="LCL" />}
                {client.interestedAIR && <Tag text="AIR" />}
                {client.interestedFTL && <Tag text="FTL" />}
                {client.interestedRAIL && <Tag text="RAIL" />}
              </td>

              <td className="border px-4 py-2 space-x-1 w-[120px]">
                {client.isImporter && <Tag text="Importer" />}
                {client.isExporter && <Tag text="Eksporter" />}
                {client.fromChina && <Tag text="Chiny" />}
              </td>

              <td className="border px-4 py-2 w-[50px]">
                <select
                  defaultValue={client.status}
                  onBlur={(e) => userRole === 'ADMIN' && handleUpdate(client.id, 'status', e.target.value)}
                  disabled={userRole !== 'ADMIN'}
                  className={`border px-2 py-1 w-full rounded
                    ${
                      client.status === 'DOAKCEPTACJI' ? 'bg-yellow-100 text-yellow-800' :
                      client.status === 'ZATWIERDZONY' ? 'bg-green-100 text-green-800' :
                      client.status === 'ODRZUCONY' ? 'bg-red-100 text-red-800' : ''
                    } ${userRole !== 'ADMIN' ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <option value="DOAKCEPTACJI">DO AKCEPTACJI</option>
                  <option value="ZATWIERDZONY">CRM</option>
                  <option value="ODRZUCONY">ODRZUCONY</option>
                </select>
              </td>

              <td className="border px-4 py-2 w-[100px] flex gap-2 justify-center">
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
