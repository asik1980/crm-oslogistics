import React, { useEffect, useState } from 'react'

const TaskCompleteModal = ({ open, onClose, client, onSaved }) => {
  const [notes, setNotes] = useState('')
  const [doneAt, setDoneAt] = useState(() => new Date().toISOString().split('T')[0])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (open) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          clientId: Number(client.id),
          goalId: Number(client.currentGoalId),
          doneAt: new Date(doneAt).toISOString(),
          notes,
          status: 'DONE'
        }),
      })

      if (response.ok) {
        onSaved?.()
        onClose()
      } else {
        const error = await response.json()
        alert(error.message || 'Wystąpił błąd')
      }
    } catch (err) {
      console.error('❌ Błąd tworzenia zadania:', err)
      alert('Błąd połączenia z serwerem.')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          ❌
        </button>
        <h2 className="text-lg font-bold mb-4">
          Potwierdzenie zadania dla: <span className="text-blue-700">{client.name}</span>
        </h2>

        <label className="block text-sm font-medium mb-1">Data wykonania:</label>
        <input
          type="date"
          value={doneAt}
          onChange={(e) => setDoneAt(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <label className="block text-sm font-medium mb-1">Notatka:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="O czym rozmawiałeś, co ustalono..."
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          ✅ Zatwierdź zadanie
        </button>
      </div>
    </div>
  )
}

export default TaskCompleteModal
