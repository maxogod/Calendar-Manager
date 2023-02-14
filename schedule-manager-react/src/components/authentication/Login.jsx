import React, { useEffect, useState } from 'react'
import { actions } from '../../slices/userSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script'

function Login() {

  const defaultUser = {
    email: '',
    password: '',
  }
  const [user, setUser] = useState(defaultUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    dispatch(actions.login(user))
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
    <div className='home' style={{background: '#BFD6E6', width: '100%', height: '92.5vh'}}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input id='email' name='email' type="text" value={user.email} onChange={handleChange} placeholder='E.g. person@email.com' required />
        </label>
        <label htmlFor="password">
          <input id='password' name='password' type="password" value={user.password} onChange={handleChange} placeholder='********' required/>
        </label>

        <button type="submit">Submit</button>
      </form>
      <Link to='/signup' className="btn btn-primary">Sign up</Link>
      <GoogleOauth />
    </div>
  )
}

export function GoogleOauth () {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSuccess = credentialResponse => {
    const data = jwt_decode(credentialResponse.credential)
    const uid = data.sub
    dispatch(actions.googleOauth({uid: uid, extra_info: data}))
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  const handleError = () => {
    alert('Failed to log in')
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
  <GoogleLogin
    onSuccess={handleSuccess}
    onError={handleError}
    cookiePolicy={"single_host_policy"}
  />
  )
}

export default Login