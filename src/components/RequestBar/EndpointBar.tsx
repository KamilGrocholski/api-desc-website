import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const EndpointBar: React.FC = () => {
  
    const { setCurrentSetup, currentSetup } = useRequestsTreesStore()
  
    const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setCurrentSetup({ endpoint: e.target.value })
    }

    return (
      <div>
        <input 
          type='text'
          value={ currentSetup.endpoint }
          onChange={ handleEndpointChange }
          className='text-black bg-gray-400 px-2 py-1'
        />
      </div>
    )
}

export default EndpointBar