import Link from "next/link"
import { useEffect, useState } from "react"
import { MethodValue } from "../../constants/Methods"
import useRequestStore from "../../store/requestStore"

const RequestsHistoryWindow: React.FC = () => {
    const { requestsList, setBaseURL, setMethod, setEndpoint } = useRequestStore()

    const [list, setList] = useState<typeof requestsList>([])
    useEffect(() => {
      setList(requestsList.reverse())
    }, [requestsList])
    
    const handleSetRequest = (method: MethodValue, baseURL: string, endpoint: string) => {
      setMethod(method)
      setBaseURL(baseURL)
      setEndpoint(endpoint)
    }

    return (
      <div className='overflow-y-scroll fixed top-10 bottom-10 left-20 w-fit p-3 flex flex-col space-y-1'>
        {list.map((request, i) => (
          <button className='flex flex-row space-x-1 items-center' key={ i } onClick={ () => handleSetRequest(request.method, request.baseURL, request.endpoint) }>

              <div className={ `${request.method} rounded-md w-fit h-fit px-2 py-1` }>{ request.method }</div>

              <div className='flex flex-col'>
                <div className='flex flex-row space-x-1 items-center'>
                  <Link href={ request.baseURL + request.endpoint }>
                    <a target='_blank' onClick={ e => e.stopPropagation() }>{ request.baseURL.replace(/(^\w+:|^)\/\//, '') + request.endpoint }</a>
                  </Link>
                </div>

                <div>
                  <div className='text-white/40'>{ new Date(request.time).toLocaleString('pl-PL') }</div>
                </div>
              </div>

          </button>
        ))}
      </div>
    )
}

export default RequestsHistoryWindow