import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const ClientModal = ({ open, onClose, onAdded }) => {
  if (!open) return null

  const [formData, setFormData] = useState({
    nip: '',
    name: '',
    city: '',
    zipCode: '',
    address: '',
    website: '',
    email: '',
    phone: ''
  })

  const [nipExists, setNipExists] = useState(false)
  const [nipInfo, setNipInfo] = useState(null)
  const [error, setError] = useState(null)

  let role = ''
  try {
    const decoded = jwtDecode(localStorage.getItem('token'))
    role = decoded.role
  } catch {}

  const handleNipCheck = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/nip/${formData.nip}`)
      if (res.data.exists) {
        setNipExists(true)
        setNipInfo(res.data.owner)
        setError(`Klient istnieje — opiekun: ${res.data.owner.name}`)
      } else {
        setNipExists(false)
        if (res.data.data) {
          setFormData(prev => ({ ...prev, ...res.data.data }))
        } else {
          setError('Brak danych z rejestru REGON')
        }
      }
    } catch (err) {
      console.error('Błąd NIP:', err)
      setError('Błąd sprawdzania NIP')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (nipExists) return

    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:3000/clients', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      onAdded()
      onClose()
    } catch (err) {
      console.error('Błąd przy dodawaniu klienta:', err)
    }
  }

  const isAdmin = role === 'ADMIN'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Dodaj klienta</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input
            name="nip"
            placeholder="NIP"
            value={formData.nip}
            onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
            onBlur={handleNipCheck}
            className="border p-2 col-span-2"
            required
          />

          {error && (
            <div className="col-span-2 text-red-600 text-sm">
              {error}
            </div>
          )}

          <input
            name="name"
            placeholder="Nazwa firmy"
            value={formData.name}
            disabled={!isAdmin}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 col-span-2"
          />

          <input
            name="city"
            placeholder="Miasto"
            value={formData.city}
            disabled={!isAdmin}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="border p-2"
          />
          <input
            name="zipCode"
            placeholder="Kod pocztowy"
            value={formData.zipCode}
            disabled={!isAdmin}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            className="border p-2"
          />

          <input
            name="address"
            placeholder="Adres"
            value={formData.address}
            disabled={!isAdmin}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="border p-2 col-span-2"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            disabled={!isAdmin}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2"
          />
          <input
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            disabled={!isAdmin}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border p-2"
          />

          <input
            name="website"
            placeholder="Strona www"
            value={formData.website}
            disabled={!isAdmin}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="border p-2 col-span-2"
          />

          <button
            type="submit"
            disabled={nipExists}
            className={`col-span-2 mt-4 py-2 rounded text-white
              ${nipExists ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            ➕ Dodaj klienta
          </button>
        </form>
      </div>
    </div>
  )
}

export default ClientModal
