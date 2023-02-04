import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/page-info/About'
import Help from './components/page-info/Help'
import Calendars from './components/calendars/Calendars'
import CreateCalendar from './components/calendars/CreateCalendar'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/help' element={<Help />} />
        <Route path='/calendars' element={<Calendars />} />
        <Route path='/create-calendar' element={<CreateCalendar />} />
      </Routes>
    </>
  );
}

export default App;
