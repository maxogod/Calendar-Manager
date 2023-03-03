import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOauth } from './Login'
import { useState } from 'react'
import { actions } from '../../slices/userSlice'

function Signup() {

  const defaultUser = {
    username: '',
    email: '',
    password: '',
  }
  const [user, setUser] = useState(defaultUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    dispatch(actions.register(user))
    setUser(defaultUser)
    setTimeout(() => {
      navigate('/')
    }, 1000)
    e.preventDefault()
  }
  
  const handleChange = (e) => {
    const state = Object.assign({}, user);
    state[e.target.name] = e.target.value
    setUser(state)
  }

  return (
    <div className='home container'>
      <h1>Signup</h1>

      <div className='login-wrap col-4'>
        <form onSubmit={handleSubmit} className='form-wrap'>
          <label htmlFor="username">
            <input id='username' name='username' type="text" value={user.username} onChange={handleChange} placeholder='Name' required />
          </label>
          <label htmlFor="email">
            <input id='email' name='email' type="text" value={user.email} onChange={handleChange} placeholder='Email' required />
          </label>
          <label htmlFor="password">
            <input id='password' name='password' type="password" value={user.password} onChange={handleChange} placeholder='********' required/>
          </label>

          <button type="submit" className="btn submit">Sign Up</button>
        </form>
        <Link to='/login' className='btn schedule-button'>Log in</Link>
        <GoogleOauth />
      </div>
    </div>
  )
}

export default Signup