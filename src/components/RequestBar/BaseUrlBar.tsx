import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const BaseUrlBar: React.FC = () => {

    const { currentSetup, setCurrentSetup, getAllBaseUrls } = useRequestsTreesStore()
  
    const handleBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setCurrentSetup({ baseUrl: e.target.value })
    }
  
    return (
      <div className='flex flex-row'>
        <input 
          type='text'
          value={ currentSetup.baseUrl }
          onChange={ handleBaseUrlChange }
          onFocus={ e => e.target.select() }
          className='bg-gray-700 text-black px-2 py-1'
          list='baseUrls'
        />
        <datalist id='baseUrls'>
          {getAllBaseUrls().map((url, i) => (
            <option key={ i } value={ url } />
          ))}
        </datalist>
      </div>
    )
}

export default BaseUrlBar