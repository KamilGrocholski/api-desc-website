import React from 'react'

const Header: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <div className='bg-dark-1 w-full px-2 py-1 rounded-md'>
        <div className='flex flex-row space-x-3 justify-between'>
          <div>Your requests</div>
          { children }
        </div>
    </div>
  )
}

export default Header