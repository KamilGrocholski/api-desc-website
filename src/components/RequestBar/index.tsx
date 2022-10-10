import BaseUrlBar from "./BaseUrlBar"
import EndpointBar from "./EndpointBar"
import MethodBar from "./MethodBar"
import SendRequestButton from "./SendRequestButton"
import RequestNotifications from "./RequestNotifications"

const RequestBar: React.FC = () => {
    return (
        <div className='flex flex-row w-full'>
            <MethodBar />
            <BaseUrlBar />
            <EndpointBar />
            <SendRequestButton />
        </div>
    )
}

export default RequestBar