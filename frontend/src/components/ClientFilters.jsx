import React, { useState, useEffect } from 'react'

const ClientFilters = ({ onFilter, filters: initialFilters, userId, role, users = [] }) => {
  const [filters, setFilters] = useState(initialFilters || {})

  useEffect(() => {
    setFilters(initialFilters || {})
  }, [initialFilters])

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
    <div className="flex-1 flex flex-wrap items-center gap-4">
  
      {role === 'ADMIN' && (
        <div className="flex flex-col">
          <label htmlFor="userId" className="text-sm font-semibold mb-1">Handlowiec:</label>
          <select
            id="userId"
            name="userId"
            value={String(filters.userId ?? '')}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-[180px]"
          >
            <option value="">Wszyscy handlowcy</option>
            {users.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
      )}
  
      <input
        type="text"
        name="name"
        placeholder="Nazwa firmy"
        className="border px-4 py-2 rounded w-[200px]"
        value={filters.name || ''}
        onChange={handleChange}
      />
  
      <input
        type="text"
        name="city"
        placeholder="Miasto"
        className="border px-4 py-2 rounded w-[160px]"
        value={filters.city || ''}
        onChange={handleChange}
      />
  
      <input
        type="text"
        name="nip"
        placeholder="NIP"
        className="border px-4 py-2 rounded w-[140px]"
        value={filters.nip || ''}
        onChange={handleChange}
      />
  
      <select
        name="status"
        value={filters.status || ''}
        onChange={handleChange}
        className="border px-4 py-2 rounded w-[180px]"
      >
        <option value="">Wszystkie statusy</option>
        <option value="DOAKCEPTACJI">DO AKCEPTACJI</option>
        <option value="ZATWIERDZONY">CRM</option>
        <option value="ODRZUCONY">ODRZUCONY</option>
      </select>
  
      {[
        { key: 'interestedFCL', label: 'FCL' },
        { key: 'interestedLCL', label: 'LCL' },
        { key: 'interestedAIR', label: 'AIR' },
        { key: 'interestedFTL', label: 'FTL' },
        { key: 'interestedRAIL', label: 'RAIL' },
        { key: 'isImporter', label: 'Importer' },
        { key: 'isExporter', label: 'Eksporter' },
        { key: 'fromChina', label: 'Chiny' }
      ].map(({ key, label }) => (
        <label key={key} className="flex items-center gap-1 text-sm whitespace-nowrap">
          <input
            type="checkbox"
            name={key}
            checked={filters[key] || false}
            onChange={handleChange}
          /> {label}
        </label>
      ))}
  
    </div>
  )
}

export default ClientFilters
