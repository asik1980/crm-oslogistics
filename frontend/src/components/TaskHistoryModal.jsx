import React, { useEffect } from 'react'

const TaskHistoryModal = ({ client, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!client) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[600px] max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          ❌
        </button>
        <h2 className="text-lg font-bold mb-4">
          Historia zadań: <span className="text-blue-700">{client.name}</span>
        </h2>

        {client.tasks?.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {client.tasks.map(task => (
              <li key={task.id} className="border-b pb-2">
                <div className="font-medium">
                  {new Date(task.doneAt).toLocaleDateString()} - {task.goal?.label}
                </div>
                {task.notes && (
                  <div className="text-gray-600 italic">{task.notes}</div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Brak zadań do wyświetlenia.</p>
        )}
      </div>
    </div>
  )
}

export default TaskHistoryModal
