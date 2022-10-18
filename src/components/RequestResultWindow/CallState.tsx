import { useRequestsTreesStore } from "../../store/requestsTreesStore"

const CallState: React.FC = () => {
    const currentCallState = useRequestsTreesStore(state => state.currentCallState)

    const lv = 'flex flex-row space-x-3'

    return (
        <div className='flex flex-row space-x-3 p-3'>
            <div className={ lv }>
                <div>Request:</div>
                <div>{ currentCallState?.request }</div>
            </div>
            <div className={ lv }>
                <div>Response:</div>
                <div className='flex flex-col space-y-1'>
                    <div className={ lv }>
                        <div>State:</div>
                        <div>{ currentCallState?.response?.state }</div>
                    </div>
                    <div className={ lv }>
                        <div>Status:</div>
                        <div>{ currentCallState?.response?.status }</div>
                    </div>
                    <div className={ lv }>
                        <div>Time:</div>
                        <div>{ currentCallState?.response?.time }ms</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallState