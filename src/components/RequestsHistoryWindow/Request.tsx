import * as Icons from "../../assets/icons"
import { secondsToLocalString } from "../../utils/secondsToLocalString"
import Link from "next/link"
import { httpsReplace } from "../../utils/stringReplace"
import { MadeRequest, useRequestsTreesStore } from "../../store/requestsTreesStore"
import { stringsCombine } from "../../utils/stringsCombine"
import { useLayoutStore } from "../../store/layoutStore"

const Request: React.FC<{ request: MadeRequest }> = ({ request }) => {

    const { removeRequest, sendRequest, setCurrentSetup } = useRequestsTreesStore()
    const { isHistoryOpen } = useLayoutStore()

    const copyLink = (link: string) => {
      try {
        navigator.clipboard.writeText(link)
      } catch (err) {
        console.log(err)
      }
    }

    const resendRequest = (request: MadeRequest) => {
      setCurrentSetup(request)
      sendRequest()
    }

    return (
        <div   
            className='grid grid-cols-5 gap-5 items-center bg-dark-2 rounded-md px-2 drop-shadow-xl' 
          >

              <div className={ `${request.method} rounded-md h-fit method w-16 text-center ${ isHistoryOpen ? 'translate-x-0' : 'translate-x-[528%]' } col-span-1 transition-all ease-in-out duration-1000` }>
                { request.method }
              </div>

              <div className={ `flex flex-col w-full col-span-4 ${ isHistoryOpen ? 'translate-x-0' : 'translate-x-[400%]' }`}>

                <div className='flex flex-row space-x-1 items-center text-sm font-semibold'>
                  <Link href={ stringsCombine([request.baseUrl, request.endpoint]) }>
                    <a 
                      target='_blank' 
                      onClick={ e => e.stopPropagation() }
                      className='break-all'
                    >
                      { httpsReplace(stringsCombine([request.baseUrl, request.endpoint])) }
                    </a>
                  </Link>
                </div>

                <div className='flex flex-row justify-between w-full'>
                  <div className='text-white/40 text-sm'>
                    { secondsToLocalString(request.time) }
                  </div>
                  <div className='flex flex-row space-x-3'>
                    <button
                      onClick={ () => resendRequest(request) }
                      className='text-purple-500'
                    >
                      <Icons.Send />
                    </button>
                    <button
                      onClick={ () => copyLink(request.baseUrl + request.endpoint) }
                      className='text-sky-500'
                    >
                      <Icons.Link />
                    </button>
                    <button
                      onClick={ () => removeRequest(request.time) }
                      className='text-red-500'
                    >
                      <Icons.Remove />
                    </button>
                  </div>
                </div>
                
            </div>

        </div>
    )
}

export default Request
