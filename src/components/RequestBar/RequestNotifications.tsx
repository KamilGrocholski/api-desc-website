import React from 'react'
import { ToastContainer } from 'react-toastify'
import { contextClass } from '../../constants/ReactToastify'

const RequestNotifications: React.FC = () => {
  return (
    <>
      <ToastContainer 
        containerId='requestNotifications' 
        limit={ 1 }
        autoClose={ 1000 }
        theme={ 'colored' }
        className={ contextClass.dark }
      />
    </>
  )
}

export default RequestNotifications