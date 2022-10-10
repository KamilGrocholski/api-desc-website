import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const EndpointBar: React.FC = () => {
  
    const { setCurrentSetup, currentSetup, getRequestTreeByBaseUrl } = useRequestsTreesStore()
  
    const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setCurrentSetup({ endpoint: e.target.value })
    }

    return (
      <div className='grow'>
        <input 
          type='text'
          value={ currentSetup.endpoint }
          onChange={ handleEndpointChange }
          onFocus={ e => e.target.select() }
          className='text-black bg-gray-400 px-2 py-1 w-full'
          list='endpoints'
        />
        <datalist id='endpoints'>
          {getRequestTreeByBaseUrl(currentSetup.baseUrl)?.methods[currentSetup.method].map((endpoint, i) => (
            <option key={ i } value={ endpoint } />
          ))}
        </datalist>
      </div>
    )
}

export default EndpointBar