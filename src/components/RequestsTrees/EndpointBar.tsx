import React, { useState } from 'react'
import * as Icons from '../../assets/icons'
import { Method, useRequestsTreesStore, Endpoint } from '../../store/requestsTreesStore'

const EndpointBar: React.FC<{ method: Method, endpoint: Endpoint }> = ({ method, endpoint }) => {

    const [mode, setMode] = useState<'editing' | 'adding' | 'none'>('none')
 
    const [editEndpoint, setEditEndpoint] = useState<Endpoint | undefined>(undefined)
    
    const { setCurrentSetup, currentSetup, removeEndpoint, updateEndpoint } = useRequestsTreesStore()

    const handleRemoveEndpoint = (e: React.MouseEvent<HTMLButtonElement>, method: Method, endpoint: Endpoint) => {
        e.stopPropagation()
        removeEndpoint(currentSetup.baseUrl, method, endpoint)
    }

    const handleSetEditingMode = (e: React.MouseEvent<HTMLButtonElement>, endpoint: Endpoint) => {
        e.stopPropagation()
        setEditEndpoint(endpoint)
        setMode('editing')
    }

    const handleEditEndpoint = (e: React.MouseEvent<HTMLButtonElement>, method: Method, oldEndpoint: Endpoint) => {
        e.stopPropagation()
        if (!editEndpoint) return 

        updateEndpoint(currentSetup.baseUrl, method, oldEndpoint, editEndpoint)
        setMode('none')
    }

  return (
    <div
        onClick={ () => setCurrentSetup({ method: method, endpoint: endpoint }) }
        className='break-word flex-wrap flex text-white bg-dark-2 mt-1 mb-1 rounded-md px-2 ml-4 cursor-pointer'
    >
        <div className='flex flex-row space-x-3 items-center'>
            {mode !== 'editing' 
                ? <div>{ endpoint }</div>
                : <div className='flex flex-row space-x-3 items-center text-white'>
                    <input 
                        type='text'
                        value={ editEndpoint }
                        onChange={ e => setEditEndpoint(e.target.value) }
                        className='text-white bg-dark-1 px-3 rounded-md'
                    />
                    <button onClick={ e => handleEditEndpoint(e, method, endpoint) }>
                        <Icons.Check />
                    </button>
                </div>}
            <button className='text-white' onClick={ e => handleSetEditingMode(e, endpoint) }>
                <Icons.Edit />
            </button>
            <button className='text-red-500 rounded-full flex bg-dark-1' onClick={ e => handleRemoveEndpoint(e, method, endpoint) }>
                <Icons.Remove />
            </button>
        </div>
    </div>
  )
}

export default EndpointBar