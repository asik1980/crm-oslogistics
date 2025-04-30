import { API } from '../config'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ClientEditModal = ({ open, onClose, client, onSaved }) => {
  if (!open || !client) return null

  const [formData, setFormData] = useState({ ...client })
  const [contacts, setContacts] = useState(
    (client.contacts || []).map(c => ({ ...c, _changed: false }))
  )
  const [users, setUsers] = useState([])
  const [newContact, setNewContact] = useState({
    firstName: '', lastName: '', position: '', email: '', phone: '', salutation: ''
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${API}/users`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(res.data)
      } catch (err) {
        console.error('Błąd pobierania użytkowników:', err)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [open, onClose])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleContactChange = (index, field, value) => {
    setContacts(prev =>
      prev.map((c, i) =>
        i === index ? { ...c, [field]: value, _changed: true } : c
      )
    )
  }

  const saveContact = (index) => {
    setContacts(prev =>
      prev.map((c, i) =>
        i === index ? { ...c, _changed: false } : c
      )
    )
  }

  const removeContact = (index) => {
    setContacts(prev => prev.filter((_, i) => i !== index))
  }

  const handleNewContactChange = (e) => {
    const { name, value } = e.target
    setNewContact(prev => ({ ...prev, [name]: value }))
  }

  const addContact = () => {
    if (!newContact.firstName || !newContact.lastName) return
    setContacts([...contacts, { ...newContact, _changed: false }])
    setNewContact({ firstName: '', lastName: '', position: '', email: '', phone: '', salutation: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.put(`${API}/clients/${client.id}`, {
        ...formData,
        contacts
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      onSaved?.()
      onClose()
    } catch (err) {
      console.error('❌ Błąd zapisu edycji klienta:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
        <h2 className="text-2xl font-bold mb-4">✏️ Edycja klienta</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 🔵 Lewa kolumna – dane podstawowe */}
          <div className="space-y-2">
            <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Nazwa firmy" className="border p-2 w-full" required />
            <input name="city" value={formData.city || ''} onChange={handleChange} placeholder="Miasto" className="border p-2 w-full" />
            <input name="zipCode" value={formData.zipCode || ''} onChange={handleChange} placeholder="Kod pocztowy" className="border p-2 w-full" />
            <input name="address" value={formData.address || ''} onChange={handleChange} placeholder="Adres" className="border p-2 w-full" />
            <input name="nip" value={formData.nip || ''} readOnly className="border p-2 w-full bg-gray-100" />
            <input name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
            <input name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Telefon" className="border p-2 w-full" />
            <input name="website" value={formData.website || ''} onChange={handleChange} placeholder="Strona www" className="border p-2 w-full" />
            <textarea name="notes" value={formData.notes || ''} onChange={handleChange} placeholder="Uwagi" className="border p-2 w-full min-h-[80px]" />
            <select name="clientClass" value={formData.clientClass || ''} onChange={handleChange} className="border p-2 w-full">
              <option value="">Klasa klienta</option>
              <option value="A">A (VIP)</option>
              <option value="B">B (Nice)</option>
              <option value="C">C (OK)</option>
              <option value="D">D (Null)</option>
            </select>

            <select name="userId" value={formData.userId || ''} onChange={handleChange} className="border p-2 w-full">
              <option value="">Wybierz opiekuna</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* 🟢 Prawa kolumna – produkty, tagi, kontakty */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Produkty:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['interestedFCL', 'interestedLCL', 'interestedAIR', 'interestedFTL', 'interestedRAIL'].map(p => (
                  <label key={p}><input type="checkbox" name={p} checked={formData[p]} onChange={handleChange} /> {p.replace('interested', '')}</label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Tagi:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['isImporter', 'isExporter', 'fromChina'].map(t => (
                  <label key={t}><input type="checkbox" name={t} checked={formData[t]} onChange={handleChange} /> {t}</label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Kontakty:</h3>
              {contacts.map((c, index) => (
                <div key={index} className="border p-3 rounded mb-3 bg-gray-50">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input className="border p-1" value={c.firstName} onChange={e => handleContactChange(index, 'firstName', e.target.value)} placeholder="Imię" />
                    <input className="border p-1" value={c.lastName} onChange={e => handleContactChange(index, 'lastName', e.target.value)} placeholder="Nazwisko" />
                    <input className="border p-1" value={c.phone} onChange={e => handleContactChange(index, 'phone', e.target.value)} placeholder="Telefon" />
                    <input className="border p-1" value={c.email} onChange={e => handleContactChange(index, 'email', e.target.value)} placeholder="Email" />
                    <input className="border p-1" value={c.position} onChange={e => handleContactChange(index, 'position', e.target.value)} placeholder="Stanowisko" />
                    <input className="border p-1" value={c.salutation} onChange={e => handleContactChange(index, 'salutation', e.target.value)} placeholder="Zwrot grzecznościowy" />
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      type="button"
                      onClick={() => saveContact(index)}
                      disabled={!c._changed}
                      className={`text-xs px-3 py-1 rounded transition-all ${
                        c._changed ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                      }`}
                    >
                      Zapisz
                    </button>
                    <button
                      type="button"
                      onClick={() => removeContact(index)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  {[
                    { key: 'firstName', label: 'Imię' },
                    { key: 'lastName', label: 'Nazwisko' },
                    { key: 'phone', label: 'Telefon' },
                    { key: 'email', label: 'Email' },
                    { key: 'position', label: 'Stanowisko' },
                    { key: 'salutation', label: 'Zwrot grzecznościowy' }
                  ].map(({ key, label }) => (
                    <input key={key} className="border p-1" name={key} placeholder={label} value={newContact[key]} onChange={handleNewContactChange} />
                  ))}
                </div>
                <button type="button" onClick={addContact} className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                  ➕ Dodaj kontakt
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              💾 Zapisz zmiany
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ClientEditModal
