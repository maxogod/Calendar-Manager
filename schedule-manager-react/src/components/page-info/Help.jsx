import React from 'react'
import routine from '../../utils/routine.png'

function Help() {
  return (
    <div className='home container'>
      <div className='card col-6 help-wrapper'>
        <h1>Welcome to Routine Manager!</h1>
        <p>Where you can create <strong>routines</strong>, give each task an <strong>importance</strong> value,
           and keep yourself accountable and consistent.</p>
        <img src={routine} alt="A routine example" />
      </div>
      <div className='card help-wrapper second-card'>
        <h1>How to use?</h1>
        <ul>
          <li>First you need an account, log in or sign up (google recommended)</li>
          <li>Next up, you need a routine, for that go to New Routine and fill the creation form</li>
          <li>Now Click My Routines and you'll find your new routine there waiting for you!</li>
          <li>Your all set up, what are you waiting for? Lets create some routines!</li>
        </ul>
      </div>

    </div>
  )
}

export default Help