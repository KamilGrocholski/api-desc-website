import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const SendRequestButton: React.FC = () => {

  const { sendRequest } = useRequestsTreesStore()
  
    return (
      <button
        className='rounded-r-md text-black text-sm   font-semibold h-full bg-sky-500 px-6 py-1'
        onClick={ sendRequest }
      >
        Send
      </button>
    )
  }

export default SendRequestButton