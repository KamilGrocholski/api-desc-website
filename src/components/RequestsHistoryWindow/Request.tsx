import Link from "next/link"
import { Copy, Send } from "../../assets/icons"
import { RequestInstance } from "../../store/requestStore"
import useRequest from "../../hooks/useRequest"
import { secondsToLocalString } from "../../utils/secondsToLocalString"

const Request: React.FC<{ request: RequestInstance }> = ({ request }) => {

    const { set, send, copy, combinedUrl } = useRequest()

    return (
        <button 
            className='flex flex-row space-x-1 items-center' 
            onClick={ () => set({ ...request }) }
          >

              <div className={ `${request.method} rounded-md w-fit h-fit px-2 py-1` }>{ request.method }</div>

              <div className='flex flex-col'>

                <div className='flex flex-row space-x-1 items-center'>
                  <Link href={ combinedUrl({...request}) }>
                    <a 
                      target='_blank' 
                      onClick={ e => e.stopPropagation() }
                    >
                      { combinedUrl({...request}) }
                    </a>
                  </Link>
                </div>

                <div className='flex flex-row justify-between'>
                  <div className='text-white/40'>
                    { secondsToLocalString(request.time) }
                  </div>
                  <div className='flex flex-row space-x-3'>
                    <button onClick={ () => copy({...request}) }>
                      <Copy />
                    </button>
                    <button onClick={ () => send({...request}) }>
                      <Send />
                    </button>
                  </div>
                </div>
                
            </div>

        </button>
    )
}

export default Request
