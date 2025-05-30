import React from 'react'

function Wrapper({children, className = ""}) {
  return (
    <div className={`flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full ${className}`}>
        {children}
    </div>
  )
}

export default Wrapper