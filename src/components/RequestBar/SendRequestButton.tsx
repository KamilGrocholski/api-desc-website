import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const SendRequestButton: React.FC = () => {

  const { sendRequest } = useRequestsTreesStore()
  
    return (
      <button
        onClick={ () => sendRequest() }
      >
        Send
      </button>
    )
  }

export default SendRequestButton