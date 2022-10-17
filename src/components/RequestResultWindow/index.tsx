import { useState, useEffect } from "react"
import { useRequestsTreesStore } from "../../store/requestsTreesStore"
import CallState from "./CallState"

const RequestResultWindow: React.FC = () => {

    const { requestResult } = useRequestsTreesStore()
  
    const [result, setResult] = useState<typeof requestResult>([])
    useEffect(() => {
      setResult(requestResult)
    }, [requestResult])

    return (
      <div className='w-[50vw] h-[90vh] overflow-scroll flex flex-col space-y-3'>
        <CallState />
        <pre>{ JSON.stringify(result, null, 2) }</pre>
      </div>
    )
}

export default RequestResultWindow