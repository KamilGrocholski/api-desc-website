import { useRequestsTreesStore } from "../../store/requestsTreesStore"
import CallState from "./CallState"

const RequestResultWindow: React.FC = () => {

    const requestResult = useRequestsTreesStore(state => state.requestResult)

    return (
      <div className='flex flex-col space-y-3 w-[50vw] h-[90vh]'>
        <div className='h-[10vh]'>
          <CallState />
        </div>
        <div className='w-full h-full overflow-scroll flex flex-col space-y-3'>
          <pre>{ JSON.stringify(requestResult, null, 2) }</pre>
        </div>
      </div>
    )
}

export default RequestResultWindow