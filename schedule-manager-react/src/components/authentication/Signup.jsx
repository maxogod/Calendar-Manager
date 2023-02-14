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
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input id='username' name='username' type="text" value={user.username} onChange={handleChange} placeholder='E.g. CatLover123' required />
        </label>
        <label htmlFor="email">
          <input id='email' name='email' type="text" value={user.email} onChange={handleChange} placeholder='E.g. person@email.com' required />
        </label>
        <label htmlFor="password">
          <input id='password' name='password' type="password" value={user.password} onChange={handleChange} placeholder='********' required/>
        </label>

        <button type="submit">Submit</button>
      </form>
      <Link to='/login' className="btn btn-primary">Log in</Link>
      <GoogleOauth />
    </div>
  )
}

export default Signup