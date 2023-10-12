'use client'

import { Toaster } from 'react-hot-toast'

const ToasterProvider: React.FC = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
  )
}

export default ToasterProvider
