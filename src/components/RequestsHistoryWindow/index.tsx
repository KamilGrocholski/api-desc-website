import { useEffect, useState } from "react"
import { useLayoutStore } from "../../store/layoutStore"
import { useRequestsTreesStore } from "../../store/requestsTreesStore"
import ActionsNotifications from "./ActionsNotifications"
import Header from "./Header"
import Request from "./Request"

const RequestsHistoryWindow: React.FC = () => {

    const { madeRequests } = useRequestsTreesStore()
    const { isHistoryOpen, toggleIsHistoryOpen } = useLayoutStore()

    const [list, setList] = useState<typeof madeRequests>([])
    useEffect(() => {
      setList(madeRequests)
    }, [madeRequests])

    return (
      // <div className='h-64 overflow-y-scroll overscroll-none'>
      <div className={ `${ isHistoryOpen ? 'translate-x-0' : '-translate-x-[83%]' } p-3 flex flex-col space-y-1 transition-all ease-in-out duration-1000` }>
        {/* <ActionsNotifications /> */}
        <Header> 
          <button 
            onClick={ toggleIsHistoryOpen }
          >
            { isHistoryOpen ? 'Close' : 'Open' }  
          </button>
        </Header>
        <div className='flex flex-col space-y-1 overscroll-y-none overflow-y-scroll h-[85vh] no-scrollbar'> 
          {list.map((request, i) => (
            <Request 
            key={ i }
            request={ request }
            />
          ))}
        </div>
      </div>
    )
}

export default RequestsHistoryWindow