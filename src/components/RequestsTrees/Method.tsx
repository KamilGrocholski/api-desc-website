import React, { useState } from 'react'
import { Endpoint, Method, useRequestsTreesStore } from '../../store/requestsTreesStore'
import AnimateHeight from 'react-animate-height'
import * as Icons from '../../assets/icons'

const Method: React.FC<{ method: Method, endpoints: Endpoint[] }> = ({ method, endpoints }) => {

    const [mode, setMode] = useState<'editing' | 'adding' | 'none'>('none')
 
    const [newEndpoint, setNewEndpoint] = useState<Endpoint | undefined>(undefined)
    const [editEndpoint, setEditEndpoint] = useState<Endpoint | undefined>(undefined)
    const { setCurrentSetup, addEndpoint, currentSetup, removeEndpoint, updateEndpoint } = useRequestsTreesStore()
    const [height, setHeight] = useState<'auto' | number | `${number}%`>('auto')

    const handleAddNewEndpoint = (method: Method) => {
        if (!newEndpoint) return 
        
        addEndpoint(currentSetup.baseUrl, method, newEndpoint)
        setMode('none')
    }

    const handleCancelAddNewEndpoint = () => {
        setNewEndpoint(undefined)
        setMode('none')
    }

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

    const handleSetAddingMode = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if (height === 0) {
            setHeight('auto')
        }
        setMode('adding')
    }

  return (
    <div>
        <button 
            aria-expanded={ height !== 0 }
            aria-controls={ method }
            onClick={() => setHeight(height === 0 ? 'auto' : 0)}
            className={ `${ method } method w-full text-left` }
            >   
                <div className='w-full flex flex-row items-center justify-between px-2'>
                    <div>{ method }</div>
                    <div onClick={ handleSetAddingMode } >
                        <Icons.Add />
                    </div>
                </div>
        </button>
        <AnimateHeight
            id={ method }
            height={ height }
            className='text-black'
        >
            {mode === 'adding' &&
            <div className='flex flex-row space-x-3 items-center'>
                <input 
                    type='text'
                    value={ newEndpoint }
                    onChange={ e => setNewEndpoint(e.target.value) }
                    className='bg-dark-2 rounded-md px-2 text-white mt-1'
                />
                <button className='text-white' onClick={ () => handleAddNewEndpoint(method) }>
                    Add
                </button>
                <button className='text-white' onClick={ handleCancelAddNewEndpoint }>
                    Cancel
                </button>
            </div>}
            {endpoints.map((endpoint, i) => (
                <div
                    onClick={ () => setCurrentSetup({ method: method, endpoint: endpoint }) }
                    className='break-word flex-wrap flex text-white bg-dark-2 mt-1 mb-1 rounded-md px-2 ml-4 cursor-pointer'
                    key={ i }
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
            ))}
        </AnimateHeight>
    </div>
  )
}

export default Method
