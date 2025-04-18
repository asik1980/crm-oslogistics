import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ClientList from '../components/ClientList'
import ClientModal from '../components/ClientModal'
import ClientFilters from '../components/ClientFilters'

const ClientsPage = () => {
  const [clients, setClients] = useState([])
  const [filtered, setFiltered] = useState([])
  const [filters, setFilters] = useState({})
  const [showModal, setShowModal] = useState(false)

  const fetchClients = () => {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3000/clients', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setClients(res.data)
        setFiltered(res.data)
      })
      .catch(err => {
        console.error('❌ Błąd pobierania klientów:', err)
      })
  }

  const applyFilters = (all, filters) => {
    return all.filter(client => {
      const nameMatch = !filters.name || client.name?.toLowerCase().includes(filters.name.toLowerCase())
      const cityMatch = !filters.city || client.city?.toLowerCase().includes(filters.city.toLowerCase())
      const nipMatch = !filters.nip || client.nip?.toLowerCase().includes(filters.nip.toLowerCase())

      const fclMatch = !filters.interestedFCL || client.interestedFCL
      const lclMatch = !filters.interestedLCL || client.interestedLCL
      const airMatch = !filters.interestedAIR || client.interestedAIR
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

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
        <ClientFilters onFilter={handleFilterChange} />
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 h-fit"
        >
          ➕ Dodaj klienta
        </button>
      </div>

      <ClientList clients={filtered} onDelete={fetchClients} />

      <ClientModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdded={fetchClients}
      />
    </div>
  )
}

export default ClientsPage
