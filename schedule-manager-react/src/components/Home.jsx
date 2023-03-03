import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetSession } from '../hooks/useSession'
import { Link, useNavigate } from 'react-router-dom';

function Home() {

  const dispatch = useDispatch()
  const user = useGetSession(dispatch)

  let num = Math.floor(Math.random() * (18 - 1) + 1)
  if (num < 10) {
    num = `0${num}`
  } else {
    num = `${num}`
  }

  return (
    <div className='home container col-2'>
      {user.avatar ?
      <img className='pfp' src={user.avatar} alt="Profile Pic" />
    :
    <img
    className='pfp'
    src={`https://api.dicebear.com/5.x/lorelei-neutral/svg?mouth=happy${num},happy07,happy03`}
    alt="avatar"
    />}
      <h1>Hey {user.username ? `${user.username}` : `There`}!</h1>
      {!user.username && <Link to={'/signup'} className='btn home-button get-started'>Get Started!</Link>}
      <Link to={'/routines'} className='btn home-button'>See Routines</Link>
      <Link to={'/create-routine'} className='btn home-button'>Create Routine</Link>
    </div>
  )
}

export default Home