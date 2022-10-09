import { useState, useEffect } from "react"
import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const RequestResultWindow: React.FC = () => {

    const { requestResult } = useRequestsTreesStore()
  
    const [result, setResult] = useState<typeof requestResult>([])
    useEffect(() => {
      setResult(requestResult)
    }, [requestResult])

    return (
      <div className='w-[50vw] h-[90vh] overflow-scroll'>
        <pre>{ JSON.stringify(result, null, 2) }</pre>
      </div>
    )
}

export default RequestResultWindow