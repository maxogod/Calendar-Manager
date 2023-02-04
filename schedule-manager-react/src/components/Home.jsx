import React from 'react'
import { useSelector } from 'react-redux'

function Home() {

  const user = useSelector((state) => state.username)

  return (
    <div className='home' style={{background: '#BFD6E6', width: '100%', height: '92.5vh'}}>
      <h1>Hey {`${user}`}</h1>
    </div>
  )
}

export default Home