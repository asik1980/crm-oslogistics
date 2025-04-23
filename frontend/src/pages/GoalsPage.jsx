import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GoalsPage = () => {
  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState('')

  const token = localStorage.getItem('token')

  const fetchGoals = async () => {
    try {
      const res = await axios.get('http://localhost:3000/goals', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setGoals(res.data)
    } catch (err) {
      console.error('❌ Błąd pobierania celów:', err)
    }
  }

  const handleAddGoal = async () => {
    const trimmed = newGoal.trim()
    if (!trimmed) return

    try {
      await axios.post(
        'http://localhost:3000/goals',
        { label: trimmed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setNewGoal('')
      fetchGoals()
    } catch (err) {
      console.error('❌ Błąd dodawania celu:', err)
      alert('Nie udało się dodać celu')
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [])

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Zarządzanie Celami</h1>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Nowy cel (np. Telefon, Spotkanie)"
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleAddGoal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Dodaj
        </button>
      </div>

      <ul className="divide-y border rounded shadow">
        {goals.map((goal) => (
          <li key={goal.id} className="p-3 flex justify-between items-center">
            <span>{goal.label}</span>
            {/* Tu można dodać przycisk 🗑️ usuwania / ✏️ edycji */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GoalsPage
