import React, { useState } from 'react'
import { Endpoint, Method, useRequestsTreesStore } from '../../store/requestsTreesStore'
import AnimateHeight from 'react-animate-height'
import * as Icons from '../../assets/icons'
import EndpointBar from './EndpointBar'

const Method: React.FC<{ method: Method, endpoints: Endpoint[] }> = ({ method, endpoints }) => {

    const [mode, setMode] = useState<'adding' | 'none'>('none')
 
    const [newEndpoint, setNewEndpoint] = useState<Endpoint | undefined>(undefined)
    const { addEndpoint, currentSetup } = useRequestsTreesStore()
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
                <EndpointBar 
                    key={ i }
                    method={ method }
                    endpoint={ endpoint }  
                /> 
            ))}
        </AnimateHeight>
    </div>
  )
}

export default Method
