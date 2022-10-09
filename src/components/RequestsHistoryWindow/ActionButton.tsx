import React from 'react'

interface ActionButton {
    action: () => void
    children: JSX.Element | JSX.Element[]
    className?: string
}

const ActionButton: React.FC<ActionButton> = ({ action, children, className }) => {

  return (
    <button
        className={ className }
        onClick={ action }
    >
        { children } 
    </button>
  )
}

export default ActionButton