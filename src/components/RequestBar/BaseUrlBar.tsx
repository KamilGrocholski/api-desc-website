import { useState } from "react"
import useRequestStore from "../../store/requestStore"

const BaseUrlBar: React.FC = () => {

    const [isEditing, setIsEditing] = useState<boolean>(false)

    const { baseUrl, setBaseUrl } = useRequestStore()
  
    const handleBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setBaseUrl(e.target.value)
    }
  

    return (
      <div className='flex flex-row'>
        <input 
          type='text'
          value={ baseUrl }
          onChange={ handleBaseUrlChange }
          className='bg-gray-700 text-black px-2 py-1'
        />
        <button onClick={ () => setIsEditing(true) }>

        </button>
        <button onClick={ () => setIsEditing(false) }>

        </button>
      </div>
    )
}

export default BaseUrlBar