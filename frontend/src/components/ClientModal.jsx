import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const defaultForm = {
  nip: '',
  name: '',
  city: '',
  zipCode: '',
  address: '',
  website: '',
  email: '',
  phone: '',
  interestedFCL: false,
  interestedLCL: false,
  interestedAIR: false,
  interestedFTL: false,
  interestedRAIL: false,
  isImporter: false,
  isExporter: false,
  fromChina: false,
  clientClass: '',
  notes: '',
  contacts: [
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: ''
    }
  ]
}

const ClientModal = ({
  open,
  onClose,
  onAdded,
  mode = 'create',
  clientId = null,
  initialData = {}
}) => {
  if (!open) return null

  const [formData, setFormData] = useState({ ...defaultForm, ...initialData })
  const [nipExists, setNipExists] = useState(false)
  const [nipInfo, setNipInfo] = useState(null)
  const [error, setError] = useState(null)

  let role = ''
  try {
    const decoded = jwtDecode(localStorage.getItem('token'))
    role = decoded.role
  } catch {}

  const isAdmin = role === 'ADMIN'

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(prev => ({ ...prev, ...initialData }))
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...formData.contacts]
    updatedContacts[index][field] = value
    setFormData(prev => ({ ...prev, contacts: updatedContacts }))
  }

  const handleNipCheck = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/nip/${formData.nip}`)
      if (res.data.exists) {
        setNipExists(true)
        setNipInfo(res.data.owner)
        setError(`Klient istnieje — opiekun: ${res.data.owner.name}`)
      } else {
        setNipExists(false)
        setError(null)
        if (res.data.data) {
          setFormData(prev => ({ ...prev, ...res.data.data }))
        }
      }
    } catch (err) {
      setError('Błąd sprawdzania NIP')
      console.error('NIP ERROR:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (nipExists && mode === 'create') return

    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      if (mode === 'edit') {
        await axios.put(`http://localhost:3000/clients/${clientId}`, formData, { headers })
      } else {
        await axios.post(`http://localhost:3000/clients`, formData, { headers })
      }

      onAdded()
      onClose()
    } catch (err) {
      console.error('Błąd zapisu klienta:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{mode === 'edit' ? 'Edytuj klienta' : 'Dodaj klienta'}</h2>

        {error && (
          <div className="text-red-600 font-medium mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="nip" value={formData.nip} onChange={handleChange} placeholder="NIP" className="border p-2" disabled={mode === 'edit'} onBlur={mode === 'create' ? handleNipCheck : undefined} />
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Nazwa firmy" className="border p-2" />
          <input name="city" value={formData.city} onChange={handleChange} placeholder="Miasto" className="border p-2" />
          <input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Kod pocztowy" className="border p-2" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Adres" className="border p-2" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon" className="border p-2" />
          <input name="website" value={formData.website} onChange={handleChange} placeholder="Strona www" className="border p-2" />

          <select name="clientClass" value={formData.clientClass} onChange={handleChange} className="border p-2">
            <option value="">Wybierz klasę klienta</option>
            <option value="A">A (VIP)</option>
            <option value="B">B (Nice)</option>
            <option value="C">C (OK)</option>
            <option value="D">D (Null)</option>
          </select>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Uwagi"
            className="border p-2 col-span-full"
          />

          {/* Produkty */}
          <div className="col-span-full flex flex-wrap gap-4 mt-2">
            <label><input type="checkbox" name="interestedFCL" checked={formData.interestedFCL} onChange={handleChange} /> FCL</label>
            <label><input type="checkbox" name="interestedLCL" checked={formData.interestedLCL} onChange={handleChange} /> LCL</label>
            <label><input type="checkbox" name="interestedAIR" checked={formData.interestedAIR} onChange={handleChange} /> AIR</label>
            <label><input type="checkbox" name="interestedFTL" checked={formData.interestedFTL} onChange={handleChange} /> FTL</label>
            <label><input type="checkbox" name="interestedRAIL" checked={formData.interestedRAIL} onChange={handleChange} /> Kolej</label>
          </div>

          {/* Tagi */}
          <div className="col-span-full flex flex-wrap gap-4 mt-2">
            <label><input type="checkbox" name="isImporter" checked={formData.isImporter} onChange={handleChange} /> Importer</label>
            <label><input type="checkbox" name="isExporter" checked={formData.isExporter} onChange={handleChange} /> Eksporter</label>
            <label><input type="checkbox" name="fromChina" checked={formData.fromChina} onChange={handleChange} /> Z Chin</label>
          </div>

          {/* Osoba kontaktowa (pierwsza) */}
          <div className="col-span-full mt-4 border-t pt-4">
            <h3 className="font-semibold text-md mb-2">Osoba kontaktowa</h3>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Imię" value={formData.contacts[0]?.firstName || ''} onChange={(e) => handleContactChange(0, 'firstName', e.target.value)} className="border p-2" />
              <input type="text" placeholder="Nazwisko" value={formData.contacts[0]?.lastName || ''} onChange={(e) => handleContactChange(0, 'lastName', e.target.value)} className="border p-2" />
              <input type="text" placeholder="Stanowisko" value={formData.contacts[0]?.position || ''} onChange={(e) => handleContactChange(0, 'position', e.target.value)} className="border p-2" />
              <input type="text" placeholder="Telefon" value={formData.contacts[0]?.phone || ''} onChange={(e) => handleContactChange(0, 'phone', e.target.value)} className="border p-2" />
              <input type="text" placeholder="Email" value={formData.contacts[0]?.email || ''} onChange={(e) => handleContactChange(0, 'email', e.target.value)} className="border p-2" />
            </div>
          </div>

          <div className="col-span-full mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {mode === 'edit' ? 'Zapisz zmiany' : '➕ Dodaj klienta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ClientModal
