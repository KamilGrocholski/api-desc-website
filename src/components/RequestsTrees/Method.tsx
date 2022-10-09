import React, { useState } from 'react'
import { Endpoint, Method } from '../../store/requestsTreesStore'
import AnimateHeight from 'react-animate-height'

const Method: React.FC<{ method: Method, endpoints: Endpoint[] }> = ({ method, endpoints }) => {

    const [height, setHeight] = useState<'auto' | number | `${number}%`>(0)

  return (
    <div>
        <button 
            aria-expanded={ height !== 0 }
            aria-controls={ method }
            onClick={() => setHeight(height === 0 ? 'auto' : 0)}
            className={ `${ method } method w-full text-left` }
            >   
                { method }
        </button>
        <AnimateHeight
            id={ method }
            height={ height }
        >
            {endpoints.map((endpoint, i) => (
                <div
                    className='break-word flex-wrap flex bg-dark-2 mt-1 mb-1 rounded-md px-2 ml-4'
                    key={ i }
                >
                    { endpoint }
                </div>
            ))}
        </AnimateHeight>
    </div>
  )
}

export default Method
