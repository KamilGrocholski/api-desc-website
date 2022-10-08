import useRequestStore from "../../store/requestStore"

const SendRequestButton: React.FC = () => {

    const { method, baseURL, endpoint, setRequestResult, setRequestsList } = useRequestStore()
  
    const handleSendRequest = () => {
      console.log(method + baseURL + endpoint)
      fetch(baseURL + endpoint, {
        method
      })
      .then(res => res.json())
      .then(data => {
        setRequestResult(data),
        setRequestsList({
          method,
          baseURL,
          endpoint,
          time: Date.now()
        })
      })
      .catch(err => console.log(err))
    }
  
    return (
      <button
        onClick={ handleSendRequest }
      >
        Send
      </button>
    )
  }

export default SendRequestButton