import React, { useEffect, useState } from 'react'
import { BaseUrl, useRequestsTreesStore } from '../../store/requestsTreesStore'
import * as Icons from '../../assets/icons'

const BaseUrl = () => {

    const [mode, setMode] = useState<'adding' | 'editing' | 'none'>('none')

    const [newBaseUrl, setNewBaseUrl] = useState<BaseUrl | undefined>(undefined)
    const [editBaseUrl, setEditBaseUrl] = useState<BaseUrl | undefined>(undefined) 

    const { setCurrentSetup, getAllBaseUrls, currentSetup, addRequestTree, updateBaseUrl, removeRequestTree } = useRequestsTreesStore() 
    const currentBaseUrl = useRequestsTreesStore(state => state.currentSetup.baseUrl)
    const [selectedBaseUrl, setSelectedBaseUrl] = useState<BaseUrl | undefined>(currentSetup.baseUrl) 

    useEffect(() => {
        setCurrentSetup({ baseUrl: selectedBaseUrl })
    }, [selectedBaseUrl, setCurrentSetup])

    const handleSetEditMode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setEditBaseUrl(currentSetup.baseUrl)
        setMode('editing')
    }

    const handleSetAddMode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setMode('adding')
    }

    const handleAddNewBaseRequestTree = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (!newBaseUrl) return 

        addRequestTree(newBaseUrl)
        setSelectedBaseUrl(newBaseUrl)
        setMode('none')
    }

    const handleCancelBaseUrlEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setEditBaseUrl(undefined)
        setMode('none')
    }

    const handleSaveBaseUrlEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (!editBaseUrl) return 
        updateBaseUrl(currentSetup.baseUrl, editBaseUrl)
        setSelectedBaseUrl(editBaseUrl)
        setMode('none')
    }

    const handleRemoveTree = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (!selectedBaseUrl) return 
        removeRequestTree(currentBaseUrl)
        setSelectedBaseUrl(currentBaseUrl)
    }

  return (
    <div>

        {mode === 'adding' && 
        <div className='flex flex-row space-x-3 items-center'>
            <input 
                type='text'
                value={ newBaseUrl }
                onChange={ e => setNewBaseUrl(e.target.value) }
                className='text-white rounded-md px-2 bg-dark-1'
            />
            <button onClick={ handleAddNewBaseRequestTree }>
                Add
            </button>
        </div>}

        {mode === 'editing' && 
        <div className='flex flex-row space-x-3 items-center'>
            <input 
                type='text'
                value={ editBaseUrl }
                onChange={ e => setEditBaseUrl(e.target.value) }
                className='text-white rounded-md px-2 bg-dark-1'
            />
            <button onClick={ handleSaveBaseUrlEdit }>
                <Icons.Check />
            </button>
            <button onClick={ handleCancelBaseUrlEditing }>
                Cancel
            </button>
        </div>}

        {mode === 'none' &&
            <div className='flex flex-row space-x-3 items-center'>
                <input 
                    list='baseUrls'
                    value={ currentBaseUrl }
                    onChange={ e => setCurrentSetup({ baseUrl: e.target.value }) }
                    // value={ selectedBaseUrl }
                    // onChange={ e => setSelectedBaseUrl(e.target.value) }
                    onFocus={ e => e.target.select() }
                    className='text-white bg-dark-2 rounded-md px-2 py-1 w-full'
                />
                <datalist
                    id='baseUrls'
                >
                    {getAllBaseUrls().map((url, i) => (
                        <option key={ i } value={ url }>
                            { url }
                        </option>
                    ))}
                </datalist>
                <button onClick={ handleSetEditMode }>
                    <Icons.Edit /> 
                </button>
                <button onClick={ handleSetAddMode }>
                    <Icons.Add /> 
                </button>
                <button onClick={ handleRemoveTree }>
                    <Icons.Remove />
                </button>
            </div>}
    </div> 
  )
}

export default BaseUrl