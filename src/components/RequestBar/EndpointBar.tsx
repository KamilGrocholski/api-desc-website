import useRequestStore from "../../store/requestStore"

const EndpointBar: React.FC = () => {
  
    const { endpoint, setEndpoint } = useRequestStore()
  
    const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setEndpoint(e.target.value)
    }

    return (
      <div>
        <input 
          type='text'
          value={ endpoint }
          onChange={ handleEndpointChange }
          className='text-black bg-gray-400 px-2 py-1'
        />
      </div>
    )
}

export default EndpointBar