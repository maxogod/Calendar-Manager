import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetSession } from '../hooks/useSession'

function Home() {

  const dispatch = useDispatch()
  const user = useGetSession(dispatch)

  return (
    <div className='home' style={{background: '#BFD6E6', width: '100%', height: '92.5vh'}}>
      <h1>Hey {user ? `${user.username}` : `null`}</h1>
    </div>
  )
}

export default Home