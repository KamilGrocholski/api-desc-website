import BaseUrlBar from "./BaseUrlBar"
import EndpointBar from "./EndpointBar"
import MethodBar from "./MethodBar"
import SendRequestButton from "./SendRequestButton"

const RequestBar: React.FC = () => {
    return (
        <div className='flex flex-row sticky top-0'>
            <MethodBar />
            <BaseUrlBar />
            <EndpointBar />
            <SendRequestButton />
        </div>
    )
}

export default RequestBar