import React from 'react'
import { ToastContainer } from 'react-toastify'
import { TOAST_CONTAINERS_IDS } from '../../constants/ToastContainers'

const ActionsNotifications: React.FC = () => {

  return (
    <>
        <ToastContainer 
            theme={ 'dark' }
            limit={ 1 }
            icon={ false }
            className={ 'absolute right-0 top-0 bottom-0' } 
            containerId={ TOAST_CONTAINERS_IDS['HISTORY_REQUEST_ACTION_NOTIFICATIONS'] }
        />
    </>
  )
}

export default ActionsNotifications