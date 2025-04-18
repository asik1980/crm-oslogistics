import React from 'react'

const Toast = ({ message, type = 'success' }) => {
  return (
    <div className={`fixed top-6 right-6 px-4 py-2 rounded text-white shadow-lg z-50
      ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {message}
    </div>
  )
}

export default Toast
