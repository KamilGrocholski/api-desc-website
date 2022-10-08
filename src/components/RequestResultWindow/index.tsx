import { useState, useEffect } from "react"
import useRequestStore from "../../store/requestStore"

const RequestResultWindow: React.FC = () => {

    const { requestResult } = useRequestStore()
  
    const [result, setResult] = useState<typeof requestResult>([])
    useEffect(() => {
      setResult(requestResult)
    }, [requestResult])

    return (
      <div className='w-[50vw] overflow-x-scroll'>
        <pre>{ JSON.stringify(result, null, 2) }</pre>
      </div>
    )
}

export default RequestResultWindow