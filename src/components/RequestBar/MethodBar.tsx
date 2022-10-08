import { MethodValue, METHODS } from "../../constants/Methods"
import useRequestStore from "../../store/requestStore"

const MethodBar: React.FC = () => {

    const { method, setMethod } = useRequestStore()
  
    const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault()
      setMethod(e.target.value as MethodValue)
    }
  
    return (
      <div>
        <select
          value={ method }
          onChange={ handleMethodChange }
          className={ `${ method } px-2 py-1` }
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