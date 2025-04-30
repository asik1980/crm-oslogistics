import { API } from '../config'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ClientList from '../components/ClientList'
import ClientModal from '../components/ClientModal'
import ClientEditModal from '../components/ClientEditModal'
import ClientFilters from '../components/ClientFilters'

const ClientsPage = ({ user }) => {
  const userId = user?.sub
  const role = user?.role

  const [clients, setClients] = useState([])
  const [filtered, setFiltered] = useState([])
  const [filters, setFilters] = useState(() => {
    return userId ? { userId: String(userId) } : {}
  })
  const [users, setUsers] = useState([])
  const [goals, setGoals] = useState([]) // ✅ nowość
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)

  useEffect(() => {
    fetchClients()
    fetchGoals() // ✅ nowość
    if (role === 'ADMIN') fetchUsers()
  }, [filters])

  const fetchClients = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/clients`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params: filters
    })
      .then(res => {
        setClients(res.data)
        setFiltered(res.data)
      })
      .catch(err => {
        console.error('❌ Błąd pobierania klientów:', err)
      })
  }

  const fetchGoals = () => {
    axios.get(`${API}/goals`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => setGoals(res.data))
      .catch(err => {
        console.error('❌ Błąd pobierania celów:', err)
      })
  }

  const fetchUsers = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/clients`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setUsers(res.data))
      .catch(err => console.error('❌ Błąd pobierania użytkowników:', err))
  }

  const applyFilters = (all, filters) => {
    return all.filter(client => {
      const nameMatch = !filters.name || client.name?.toLowerCase().includes(filters.name.toLowerCase())
      const cityMatch = !filters.city || client.city?.toLowerCase().includes(filters.city.toLowerCase())
      const nipMatch = !filters.nip || client.nip?.toLowerCase().includes(filters.nip.toLowerCase())
      const fclMatch = !filters.interestedFCL || client.interestedFCL
      const lclMatch = !filters.interestedLCL || client.interestedLCL
      const airMatch = !filters.interestedAIR || client.interestedAIR
      const ftlMatch = !filters.interestedFTL || client.interestedFTL
      const railMatch = !filters.interestedRAIL || client.interestedRAIL
      const importerMatch = !filters.isImporter || client.isImporter
      const exporterMatch = !filters.isExporter || client.isExporter
      const fromChinaMatch = !filters.fromChina || client.fromChina
      const statusMatch = !filters.status || client.status === filters.status

      return (
        nameMatch &&
        cityMatch &&
        nipMatch &&
        fclMatch &&
        lclMatch &&
        airMatch &&
        ftlMatch &&
        railMatch &&
        importerMatch &&
        exporterMatch &&
        fromChinaMatch &&
        statusMatch
      )
    })
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    const newList = applyFilters(clients, newFilters)
    setFiltered(newList)
  }

  const handleOpenAddModal = () => {
    setSelectedClient(null)
    setShowAddModal(true)
  }

  const handleOpenEditModal = (client) => {
    setSelectedClient(client)
    setShowEditModal(true)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <ClientFilters
          filters={filters}
          onFilter={handleFilterChange}
          userId={userId}
          role={role}
          users={users}
        />
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Dodaj klienta
        </button>
      </div>

      <ClientList
        clients={filtered}
        onDelete={fetchClients}
        onEdit={handleOpenEditModal}
        goals={goals} // ✅ przekazujemy do ClientList
      />

      {showAddModal && (
        <ClientModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdded={fetchClients}
        />
      )}

      {showEditModal && (
        <ClientEditModal
          open={showEditModal}
          client={selectedClient}
          onClose={() => {
            setShowEditModal(false)
            setSelectedClient(null)
          }}
          onSaved={fetchClients}
        />
      )}
    </div>
  )
}

export default ClientsPage
