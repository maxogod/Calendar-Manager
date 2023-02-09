import React from 'react'
import { Link } from 'react-router-dom'
import { useGetSession } from '../hooks/useSession'
import { useDispatch } from 'react-redux'
import { actions } from '../slices/userSlice'

function Navbar() {

  const dispatch = useDispatch()
  const user = useGetSession(dispatch)
  const logged = user ? (user.id ? true : false) : false

  const handleLogOut = () => {
    dispatch(actions.logout())
  }

  const handleLogIn = () => {
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
                <small
                  style={{cursor: 'pointer'}}
                  className="nav-link dropdown-toggle" id="navbarDropdown"
                  role="button" aria-haspopup="true" aria-expanded="false"
                  data-bs-toggle="dropdown"
                  data-bs-target="#info"
                >
                  Info
                </small>
                <div className="dropdown-menu" id='info' aria-labelledby="navbarDropdown">
                    <Link to='/help' className="dropdown-item">Help</Link>
                    <Link to='/about' className="dropdown-item">About</Link>
                </div>
            </li>
            <li className="nav-item dropdown">
                <small
                  style={{cursor: 'pointer'}}
                  className="nav-link dropdown-toggle" id="navbarDropdown"
                  role="button" aria-haspopup="true" aria-expanded="false"
                  data-bs-toggle="dropdown"
                  data-bs-target="#account"
                >
                  Account
                </small>
                <div className="dropdown-menu" id='account'>
                  {
                  !logged ?
                  
                   <Link to='/login' className="dropdown-item" onClick={handleLogIn} style={{cursor: 'pointer'}}>Log In</Link> 
                   : 
                   <small className="dropdown-item" onClick={handleLogOut} style={{cursor: 'pointer'}}>Log Out</small>
                  }
                    <small className="dropdown-item" style={{cursor: 'pointer'}}>Switch Themes</small>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar