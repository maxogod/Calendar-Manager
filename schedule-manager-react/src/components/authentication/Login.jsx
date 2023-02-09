import React, { useEffect, useState } from 'react'
import { actions } from '../../slices/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

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
      <GoogleOauth />
    </div>
  )
}

function GoogleOauth () {

  const handleCallbackResponse = (response) => {
    console.log('encoded JWT ID token: ' + response.credential)
    const user = jwt_decode(response.credential)
    console.log(user)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('googleLogIn'),
      { theme: 'outline'}
    )
  }, [])


  return (
    <>
      <div id='googleLogIn'></div>
    </>
  )
}

export default Login