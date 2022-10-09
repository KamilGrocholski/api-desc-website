import React from 'react'

const Header: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <div className='bg-dark-1 px-2 py-1 rounded-md'>
      <div>Tree</div>
    </div>
  )
}

export default Header