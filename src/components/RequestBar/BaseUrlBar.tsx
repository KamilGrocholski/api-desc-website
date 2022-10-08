import useRequestStore from "../../store/requestStore"

const BaseUrlBar: React.FC = () => {

    const { baseURL, setBaseURL } = useRequestStore()
  
    const handleBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setBaseURL(e.target.value)
    }
  
    return (
      <div>
        <input 
          type='text'
          value={ baseURL }
          onChange={ handleBaseUrlChange }
          className='bg-gray-700 text-black px-2 py-1'
        />
      </div>
    )
}

export default BaseUrlBar