import { API } from '../config'
import React, { useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import TaskCompleteModal from './TaskCompleteModal'
import TaskHistoryModal from './TaskHistoryModal'

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

const getNextTaskDate = (client) => {
  const baseDate = client.tasks?.length
    ? new Date(client.tasks[0].doneAt)
    : new Date()

  return new Date(baseDate.getTime() + (client.daysBetweenTasks || 0) * 86400000)
}

const ClientList = ({ clients = [], onDelete, onEdit, goals = [] }) => {
  const token = localStorage.getItem('token')
  const decoded = token ? jwtDecode(token) : {}
  const userRole = decoded.role

  const [selectedClient, setSelectedClient] = useState(null)
  const [historyClient, setHistoryClient] = useState(null)

  const handleDelete = async (id) => {
    if (confirm('Czy na pewno chcesz usunąć tego klienta?')) {
      try {
        await axios.delete(`${API}/clients/${id}`, {
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
      await axios.put(`${API}/clients/${id}`, {
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
            <th className="border px-4 py-2 w-[150px]">Firma</th>
            <th className="border px-4 py-2 w-[120px]">Data zadania</th>
            <th className="border px-4 py-2 w-[80px]">+D</th>
            <th className="border px-4 py-2 w-[180px]">Cel</th>
            <th className="border px-4 py-2 w-[300px]">Harmonogram</th>
            <th className="border px-4 py-2 w-[120px]">Produkty</th>
            <th className="border px-4 py-2 w-[120px]">Tagi</th>
            <th className="border px-4 py-2 w-[50px]">Status</th>
            <th className="border px-4 py-2 w-[100px] text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="border-b hover:bg-gray-50">
              <td className="border px-4 py-2 font-semibold">
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

              <td className="border px-4 py-2 text-sm text-center">
                {getNextTaskDate(client).toLocaleDateString()}
                <button
                  title="Zakończ zadanie"
                  className="ml-2 text-green-600 hover:text-green-800"
                  onClick={() => setSelectedClient(client)}
                >
                  ✅
                </button>
              </td>

              <td className="border px-4 py-2 text-center">
                <input
                  type="number"
                  defaultValue={client.daysBetweenTasks || 7}
                  className="border px-2 py-1 rounded w-[60px] text-center"
                  onBlur={(e) => handleUpdate(client.id, 'daysBetweenTasks', Number(e.target.value))}
                />
              </td>

              <td className="border px-4 py-2">
                <select
                  defaultValue={client.currentGoalId}
                  className="border px-2 py-1 rounded w-full"
                  onBlur={(e) => handleUpdate(client.id, 'currentGoalId', Number(e.target.value))}
                >
                  <option value="">-- wybierz cel --</option>
                  {goals.map(goal => (
                    <option key={goal.id} value={goal.id}>
                      {goal.label}
                    </option>
                  ))}
                </select>
              </td>

              <td className="border px-4 py-2 text-xs">
                {client.tasks?.slice(0, 3).map((task, index) => (
                  <div key={task.id} className="text-xs text-gray-700 truncate">
                    {new Date(task.doneAt).toLocaleDateString()} - <span className="font-semibold">{task.goal?.label}</span>
                    {task.notes && <span className="italic"> - {task.notes}</span>}
                    {index === 2 && client.tasks.length > 3 && (
                      <button
                        className="text-blue-500 text-xs ml-2"
                        onClick={() => setHistoryClient(client)}
                      >
                        więcej &gt;&gt;
                      </button>
                    )}
                  </div>
                ))}
              </td>

              <td className="border px-4 py-2 space-x-1">
                {client.interestedFCL && <Tag text="FCL" />}
                {client.interestedLCL && <Tag text="LCL" />}
                {client.interestedAIR && <Tag text="AIR" />}
                {client.interestedFTL && <Tag text="FTL" />}
                {client.interestedRAIL && <Tag text="RAIL" />}
              </td>

              <td className="border px-4 py-2 space-x-1">
                {client.isImporter && <Tag text="Importer" />}
                {client.isExporter && <Tag text="Eksporter" />}
                {client.fromChina && <Tag text="Chiny" />}
              </td>

              <td className="border px-4 py-2">
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

              <td className="border px-4 py-2 flex gap-2 justify-center">
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

      {selectedClient && (
        <TaskCompleteModal
          open={!!selectedClient}
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onSaved={onDelete}
        />
      )}

      {historyClient && (
        <TaskHistoryModal
          client={historyClient}
          onClose={() => setHistoryClient(null)}
        />
      )}

    </div>
  )
}

export default ClientList
