import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/clients'

const ClientForm = ({ onAdded, onClose, mode = 'create', clientId = null, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    zipCode: '',
    address: '',
    nip: '',
    website: '',
    email: '',
    phone: '',
    notes: '',
    interestedFCL: false,
    interestedLCL: false,
    interestedAIR: false,
    interestedFTL: false,
    interestedRAIL: false,
    isImporter: false,
    isExporter: false,
    fromChina: false,
    clientClass: 'D',
    ...initialData
  })

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(prev => ({ ...prev, ...initialData }))
    }
  }, [mode, initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (mode === 'edit' && clientId) {
        await axios.put(`${API_URL}/${clientId}`, formData)
      } else {
        await axios.post(API_URL, formData)
      }

      if (onAdded) onAdded()
      if (onClose) onClose()

      if (mode === 'create') {
        setFormData({
          name: '',
          city: '',
          zipCode: '',
          address: '',
          nip: '',
          website: '',
          email: '',
          phone: '',
          notes: '',
          interestedFCL: false,
          interestedLCL: false,
          interestedAIR: false,
          interestedFTL: false,
          interestedRAIL: false,
          isImporter: false,
          isExporter: false,
          fromChina: false,
          clientClass: 'D',
        })
      }

    } catch (err) {
      console.error('Błąd przy zapisie klienta:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Nazwa firmy" className="border p-2" required />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="Miasto" className="border p-2" />
      <input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Kod pocztowy" className="border p-2" />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Adres" className="border p-2" />
      <input name="nip" value={formData.nip} onChange={handleChange} placeholder="NIP" className="border p-2" />
      <input name="website" value={formData.website} onChange={handleChange} placeholder="Strona www" className="border p-2" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon" className="border p-2" />
      <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Uwagi" className="col-span-full border p-2" rows="2" />

      <div className="col-span-full flex flex-wrap gap-4 mt-2">
        <label><input type="checkbox" name="interestedFCL" checked={formData.interestedFCL} onChange={handleChange} className="mr-2" /> FCL</label>
        <label><input type="checkbox" name="interestedLCL" checked={formData.interestedLCL} onChange={handleChange} className="mr-2" /> LCL</label>
        <label><input type="checkbox" name="interestedAIR" checked={formData.interestedAIR} onChange={handleChange} className="mr-2" /> AIR</label>
        <label><input type="checkbox" name="interestedFTL" checked={formData.interestedFTL} onChange={handleChange} className="mr-2" /> FTL</label>
        <label><input type="checkbox" name="interestedRAIL" checked={formData.interestedRAIL} onChange={handleChange} className="mr-2" /> Kolej</label>
        <label><input type="checkbox" name="isImporter" checked={formData.isImporter} onChange={handleChange} className="mr-2" /> Importer</label>
        <label><input type="checkbox" name="isExporter" checked={formData.isExporter} onChange={handleChange} className="mr-2" /> Eksporter</label>
        <label><input type="checkbox" name="fromChina" checked={formData.fromChina} onChange={handleChange} className="mr-2" /> Chiny</label>
      </div>

      <div className="col-span-full">
        <label className="block mb-1 font-medium">Klasa klienta</label>
        <select
          name="clientClass"
          value={formData.clientClass}
          onChange={handleChange}
          className="border p-2 rounded w-full max-w-xs"
        >
          <option value="A">A (VIP)</option>
          <option value="B">B (Nice)</option>
          <option value="C">C (OK)</option>
          <option value="D">D (Null)</option>
        </select>
      </div>

      <div className="col-span-full">
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {mode === 'edit' ? '💾 Zapisz zmiany' : '➕ Dodaj klienta'}
        </button>
      </div>
    </form>
  )
}

export default ClientForm
