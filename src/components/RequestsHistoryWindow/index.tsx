import { useEffect, useState } from "react"
import useRequestStore from "../../store/requestStore"
import ActionsNotifications from "./ActionsNotifications"
import Header from "./Header"
import Request from "./Request"

const RequestsHistoryWindow: React.FC = () => {

    const { requestsList } = useRequestStore()

    const [list, setList] = useState<typeof requestsList>([])
    useEffect(() => {
      setList(requestsList)
    }, [requestsList])

    return (
      <div className='overflow-y-scroll fixed top-10 bottom-10 left-20 w-fit p-3 flex flex-col space-y-1 overscroll-y-none'>
        <ActionsNotifications />
        <Header/>
        {list.map((request, i) => (
          <Request 
            key={ i }
            request={ request }
          />
        ))}
      </div>
    )
}

export default RequestsHistoryWindow