import React from 'react'
import Navbar from './nav'

const MyLayout = ({children, pageName}) => {
  return (
    <div>
        <Navbar pageName={pageName}/>
        {children}
    </div>
  )
}

export default MyLayout