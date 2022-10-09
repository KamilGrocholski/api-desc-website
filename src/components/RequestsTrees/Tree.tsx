import React from 'react'
import { MethodValue } from '../../constants/Methods'
import type { RequestTree } from '../../store/requestsTreesStore'
import Method from './Method'

const Tree: React.FC<{ tree: RequestTree }> = ({ tree }) => {
  return (
    <div className='flex flex-col space-y-1 no-scrollbar overscroll-y-scroll overscroll-none'>
        {Object.entries(tree.methods).map(([method, endpoints], i) => (
            <Method 
                key={ i }
                method={ method as MethodValue}
                endpoints={ endpoints }
            />
        ))}
    </div>
  )
}

export default Tree