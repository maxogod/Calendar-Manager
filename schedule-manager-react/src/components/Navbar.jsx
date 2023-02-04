import React from 'react'
import { Link } from 'react-router-dom'
import { actions } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCookie, removeCookie } from '../hooks/useCookies'

function Navbar() {

  const user = useSelector((state) => state.username)
  const maxo = {username: 'maxo'}

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(actions.logout())
    removeCookie('user')
  }

  const handleLogIn = () => {
    dispatch(actions.login(maxo.username))
    setCookie('user', maxo.username)
  }

  return (
    <div className="navbar navbar-expand-xl navbar-light bg-light">
      <div className="container">
        <Link to='/' className="navbar-brand col-8">Calendar Manager</Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-label="Expand navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col" id="nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to='/' className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to='/calendars' className="nav-link">My Calendars</Link>
            </li>
            <li className="nav-item">
              <Link to='/create-calendar' className="nav-link">New Calendar</Link>
            </li>
            <li className="nav-item dropdown">
                <a
                  style={{cursor: 'pointer'}}
                  className="nav-link dropdown-toggle" id="navbarDropdown"
                  role="button" aria-haspopup="true" aria-expanded="false"
                  data-bs-toggle="dropdown"
                  data-bs-target="#info"
                >
                  Info
                </a>
                <div className="dropdown-menu" id='info' aria-labelledby="navbarDropdown">
                    <Link to='/help' className="dropdown-item">Help</Link>
                    <Link to='/about' className="dropdown-item">About</Link>
                </div>
            </li>
            <li className="nav-item dropdown">
                <a
                  style={{cursor: 'pointer'}}
                  className="nav-link dropdown-toggle" id="navbarDropdown"
                  role="button" aria-haspopup="true" aria-expanded="false"
                  data-bs-toggle="dropdown"
                  data-bs-target="#account"
                >
                  Account
                </a>
                <div className="dropdown-menu" id='account'>
                  {
                  !user ?
                   <a className="dropdown-item" onClick={handleLogIn} style={{cursor: 'pointer'}}>Log In</a> 
                   : 
                   <a className="dropdown-item" onClick={handleLogOut} style={{cursor: 'pointer'}}>Log Out</a>
                  }
                    <a className="dropdown-item" style={{cursor: 'pointer'}}>Switch Themes</a>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar