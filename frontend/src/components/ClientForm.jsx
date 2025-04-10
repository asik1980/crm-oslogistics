import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/clients'

const ClientForm = ({ onAdded }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Wysyłam:', form)

    try {
      await axios.post(API_URL, form)
      setForm({ name: '', email: '', phone: '' })
      onAdded() // odśwież listę
    } catch (err) {
      console.error('Błąd przy dodawaniu klienta:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Dodaj klienta</h2>
      <div className="mb-2">
        <input
          type="text"
          name="name"
          placeholder="Imię i nazwisko"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="phone"
          placeholder="Telefon"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Dodaj
      </button>
    </form>
  )
}

export default ClientForm
