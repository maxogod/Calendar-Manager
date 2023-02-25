import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/page-info/About'
import Help from './components/page-info/Help'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'
import Schedules from './components/schedules/Schedules'
import CreateSchedule from './components/schedules/CreateSchedule'
import Schedule from './components/schedules/Schedule'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/help' element={<Help />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/calendars' element={<Schedules />} />
        <Route path='/create-calendar' element={<CreateSchedule />} />
      </Routes>
    </>
  );
}

export default App;
