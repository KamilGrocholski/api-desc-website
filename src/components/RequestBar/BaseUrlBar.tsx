import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const BaseUrlBar: React.FC = () => {

    const { setCurrentSetup, getAllBaseUrls } = useRequestsTreesStore()
    const currentBaseUrl = useRequestsTreesStore(state => state.currentSetup.baseUrl)
  
    const handleBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setCurrentSetup({ baseUrl: e.target.value })
    }
  
    return (
      <div className='flex flex-row grow-0'>
        <input 
          type='text'
          value={ currentBaseUrl }
          onChange={ handleBaseUrlChange }
          onFocus={ e => e.target.select() }
          className='bg-gray-700 text-white px-2 py-1 min-w-[15vw]'
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