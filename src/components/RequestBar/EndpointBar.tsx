import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const EndpointBar: React.FC = () => {
  
    const { setCurrentSetup, getRequestTreeByBaseUrl } = useRequestsTreesStore()
    const currentEndpoint = useRequestsTreesStore(state => state.currentSetup.endpoint)
    const currentBaseUrl = useRequestsTreesStore(state => state.currentSetup.baseUrl)
    const currentMethod = useRequestsTreesStore(state => state.currentSetup.method)
  
    const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setCurrentSetup({ endpoint: e.target.value })
    }

    return (
      <div className='grow'>
        <input 
          type='text'
          value={ currentEndpoint }
          onChange={ handleEndpointChange }
          onFocus={ e => e.target.select() }
          className='text-black bg-gray-400 px-2 py-1 w-full'
          list='endpoints'
        />
        <datalist id='endpoints'>
          {getRequestTreeByBaseUrl(currentBaseUrl)?.methods[currentMethod].map((endpoint, i) => (
            <option key={ i } value={ endpoint } />
          ))}
        </datalist>
      </div>
    )
}

export default EndpointBar