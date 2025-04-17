import React from 'react'
import ClientForm from './ClientForm'

const ClientModal = ({ open, onClose, onAdded }) => {
  if (!open) return null

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
        <ClientForm onAdded={() => {
          onAdded()
          onClose()
        }} />
      </div>
    </div>
  )
}

export default ClientModal
