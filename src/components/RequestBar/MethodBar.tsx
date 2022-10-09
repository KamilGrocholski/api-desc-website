import { MethodValue, METHODS } from "../../constants/Methods"
import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const MethodBar: React.FC = () => {

    const { setCurrentSetup, currentSetup } = useRequestsTreesStore()
  
    const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault()
      setCurrentSetup({ method: e.target.value as MethodValue })
    }
  
    return (
      <div>
        <select
          value={ currentSetup.method }
          onChange={ handleMethodChange }
          className={ `${ currentSetup.method } px-2 py-1` }
        >
          {Object.values(METHODS).map((method, i) => (
            <option
              key={ method + i }
              value={ method }
              className={ `${ method }` }
            >
              { method }
            </option>
          ))}
        </select>
      </div>
    )
}

export default MethodBar 