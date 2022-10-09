import * as Icons from "../../assets/icons"
import useRequest from "../../hooks/useRequest"
import { secondsToLocalString } from "../../utils/secondsToLocalString"
import Link from "next/link"
import ActionButton from "./ActionButton"
import { httpsReplace } from "../../utils/stringReplace"
import type { MadeRequest } from "../../store/requestsTreesStore"

const Request: React.FC<{ request: MadeRequest }> = ({ request }) => {

    const { set, send, copy, combinedUrl, remove } = useRequest()

    return (
        <div   
            className='flex flex-row space-x-2 items-center bg-dark-2 rounded-md px-2 drop-shadow-xl' 
          >

              <div className={ `${request.method} rounded-md w-fit h-fit px-2 py-1 font-semibold text-sm text-black` }>
                { request.method }
              </div>

              <div className='flex flex-col'>

                <div className='flex flex-row space-x-1 items-center text-sm font-semibold'>
                  <Link href={ combinedUrl({...request}) }>
                    <a 
                      target='_blank' 
                      onClick={ e => e.stopPropagation() }
                    >
                      { httpsReplace(combinedUrl({...request})) }
                    </a>
                  </Link>
                </div>

                <div className='flex flex-row justify-between'>
                  <div className='text-white/40 text-sm'>
                    { secondsToLocalString(request.time) }
                  </div>
                  <div className='flex flex-row space-x-3'>
                    <ActionButton action={ () => remove(request.time) } className='text-red-500'>
                      <Icons.Remove />
                    </ActionButton>
                    <ActionButton action={ () => set({...request}) } className='text-sky-500'>
                      <Icons.Copy />  
                    </ActionButton>
                    <ActionButton action={ () => copy({...request}) } className='text-orange-500'>
                      <Icons.Link /> 
                    </ActionButton>
                    <ActionButton action={ () => send({...request}) } className='text-purple-500'>
                      <Icons.Send />  
                    </ActionButton>
                  </div>
                </div>
                
            </div>

        </div>
    )
}

export default Request
