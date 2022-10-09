import BaseUrlBar from "./BaseUrlBar"
import EndpointBar from "./EndpointBar"
import MethodBar from "./MethodBar"
import SendRequestButton from "./SendRequestButton"
import RequestNotifications from "./RequestNotifications"

const RequestBar: React.FC = () => {
    return (
        <>
            <div className='flex flex-row'>
                <MethodBar />
                <BaseUrlBar />
                <EndpointBar />
                <SendRequestButton />
            </div>
            {/* <RequestNotifications /> */}
        </>
    )
}

export default RequestBar