import React from 'react'
import { ToastContainer } from 'react-toastify'

const RequestNotifications: React.FC = () => {
  return (
    <>
      <ToastContainer 
        containerId='requestNotifications' 
        limit={ 1 }
        autoClose={ 1000 }
        theme={ 'colored' }
      />
    </>
  )
}

export default RequestNotifications