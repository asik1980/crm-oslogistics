import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/clients'

const ClientForm = ({ onAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    zipCode: '',
    address: '',
    nip: '',
    website: '',
    email: '',
    phone: '',
    interestedFCL: false,
    interestedLCL: false,
    interestedAIR: false,
    isImporter: false,
    isExporter: false,
    fromChina: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(API_URL, formData)
      console.log('Dodano klienta:', response.data)
      if (onAdded) onAdded()
      setFormData({
        name: '',
        city: '',
        zipCode: '',
        address: '',
        nip: '',
        website: '',
        email: '',
        phone: '',
        interestedFCL: false,
        interestedLCL: false,
        interestedAIR: false,
        isImporter: false,
        isExporter: false,
        fromChina: false,
      })
    } catch (err) {
      console.error('Błąd przy dodawaniu klienta:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Nazwa firmy" className="border p-2" required />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="Miasto" className="border p-2" />
      <input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Kod pocztowy" className="border p-2" />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Adres" className="border p-2" />
      <input name="nip" value={formData.nip} onChange={handleChange} placeholder="NIP" className="border p-2" />
      <input name="website" value={formData.website} onChange={handleChange} placeholder="Strona www" className="border p-2" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon" className="border p-2" />

      <div className="col-span-full flex flex-wrap gap-4 mt-2">
        <label><input type="checkbox" name="interestedFCL" checked={formData.interestedFCL} onChange={handleChange} className="mr-2" /> FCL</label>
        <label><input type="checkbox" name="interestedLCL" checked={formData.interestedLCL} onChange={handleChange} className="mr-2" /> LCL</label>
        <label><input type="checkbox" name="interestedAIR" checked={formData.interestedAIR} onChange={handleChange} className="mr-2" /> AIR</label>
        <label><input type="checkbox" name="isImporter" checked={formData.isImporter} onChange={handleChange} className="mr-2" /> Importer</label>
        <label><input type="checkbox" name="isExporter" checked={formData.isExporter} onChange={handleChange} className="mr-2" /> Eksporter</label>
        <label><input type="checkbox" name="fromChina" checked={formData.fromChina} onChange={handleChange} className="mr-2" /> Ściąga z Chin</label>
      </div>

      <button type="submit" className="col-span-full mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Dodaj klienta
      </button>
    </form>
  )
}

export default ClientForm
