import React from 'react'
import blob from '../../utils/blob.svg'

function About() {

  return (
    <div className='home container col-5'>
      <img className='blob' src={blob} alt="blob" />
      <div className='about'>
        <h1>Maximo Utrera</h1>
        <p>Hi! Here are some of my social media</p>
        <ul className='about-list'>
          <li><a className='btn' href="https://github.com/maxogod" target={'_blank'}><i class="bi bi-github"></i>GitHub</a></li>
          <li><a className='btn' href="https://www.linkedin.com/in/maximo-utrera/" target={'_blank'}><i class="bi bi-linkedin"></i>LinkedIn</a></li>
          <li><a className='btn' href="https://maxogod.github.io/" target={'_blank'}><i class="bi bi-briefcase-fill"></i>My Portfolio</a></li>
        </ul>
      </div>
      
    </div>
  )
}

export default About