import React, { useState, useEffect } from 'react'

const ClientFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    nip: '',
    interestedFCL: false,
    interestedLCL: false,
    interestedAIR: false,
    isImporter: false,
    isExporter: false,
    fromChina: false,
    status: '',
  })

  // wysyłamy filtry do rodzica po każdej zmianie
  useEffect(() => {
    if (onFilter) onFilter(filters)
  }, [filters])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center w-full max-w-6xl">
      <input
        type="text"
        name="name"
        placeholder="Nazwa firmy"
        className="border px-4 py-2 rounded"
        value={filters.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="Miasto"
        className="border px-4 py-2 rounded"
        value={filters.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="nip"
        placeholder="NIP"
        className="border px-4 py-2 rounded"
        value={filters.nip}
        onChange={handleChange}
      />
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border px-4 py-2 rounded"
      >
        <option value="">Wszystkie statusy</option>
        <option value="DOAKCEPTACJI">DO AKCEPTACJI</option>
        <option value="ZATWIERDZONY">CRM</option>
        <option value="ODRZUCONY">ODRZUCONY</option>
      </select>

      <div className="col-span-full flex flex-wrap gap-4 mt-2">
        <label><input type="checkbox" name="interestedFCL" checked={filters.interestedFCL} onChange={handleChange} /> FCL</label>
        <label><input type="checkbox" name="interestedLCL" checked={filters.interestedLCL} onChange={handleChange} /> LCL</label>
        <label><input type="checkbox" name="interestedAIR" checked={filters.interestedAIR} onChange={handleChange} /> AIR</label>
        <label><input type="checkbox" name="isImporter" checked={filters.isImporter} onChange={handleChange} /> Importer</label>
        <label><input type="checkbox" name="isExporter" checked={filters.isExporter} onChange={handleChange} /> Eksporter</label>
        <label><input type="checkbox" name="fromChina" checked={filters.fromChina} onChange={handleChange} /> Chiny</label>
      </div>
    </div>
  )
}

export default ClientFilters
