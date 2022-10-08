import useRequest from "../../hooks/useRequest"
import useRequestStore from "../../store/requestStore"

const SendRequestButton: React.FC = () => {

    const { method, baseURL, endpoint } = useRequestStore()
    const { send } = useRequest()
  
    return (
      <button
        onClick={ () => send({ method, baseURL, endpoint }) }
      >
        Send
      </button>
    )
  }

export default SendRequestButton