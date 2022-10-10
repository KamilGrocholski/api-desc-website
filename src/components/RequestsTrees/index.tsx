import React from 'react'
import Header from './Header'
import { useRequestsTreesStore } from '../../store/requestsTreesStore'
import Tree from './Tree'
import BaseUrl from './BaseUrl'

const RequestsTrees: React.FC = () => {
  const { currentSetup } = useRequestsTreesStore()
  const tree = useRequestsTreesStore(state => state.requestsTrees.find(tree => tree.baseUrl === currentSetup.baseUrl)) // zustand listener

  return (
    <div className='p-3 flex flex-col space-y-1 w-[20vw]'>
        <Header /> 
        <BaseUrl />
        {tree &&
        <Tree tree={ tree } />}
    </div>
  )
}

export default RequestsTrees