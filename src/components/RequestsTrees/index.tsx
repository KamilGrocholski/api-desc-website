import React, { useEffect, useState } from 'react'
import Header from './Header'
import { RequestTree, useRequestsTreesStore } from '../../store/requestsTreesStore'
import Tree from './Tree'

const RequestsTrees: React.FC = () => {
  const { getAllBaseUrls, getRequestTreeByBaseUrl, currentSetup } = useRequestsTreesStore()

  const [selectedBaseUrl, setSelectedBaseUrl] = useState<string>(currentSetup.baseUrl)
  const [selectedTree, setSelectedTree] = useState<RequestTree | undefined>(getRequestTreeByBaseUrl(selectedBaseUrl))

  useEffect(() => {
    setSelectedTree(getRequestTreeByBaseUrl(selectedBaseUrl))
  }, [selectedBaseUrl])

  return (
    <div className='p-3 flex flex-col space-y-1'>
        <Header />
        <div>
          <input 
            list='baseUrls'
            value={ selectedBaseUrl }
            onChange={ e => setSelectedBaseUrl(e.target.value) }
            onFocus={ e => e.target.select() }
            className='text-black bg-dark-2 rounded-md px-2 py-1'
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
        </div>
        {selectedTree &&
        <Tree 
          tree={ selectedTree }
        />}
    </div>
  )
}

export default RequestsTrees