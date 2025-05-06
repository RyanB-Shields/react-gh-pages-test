// import { useState } from 'react';
// import Calendar from 'react-calendar';
import MyCalendar from './myCalendar.js';
// import 'react-calendar/dist/Calendar.css';
import './App.css';
import wlLogo from "./images/worldline-mint-horizontal.png";

function App() {
  // const [date, setDate] = useState(new Date(2025, 3, 1));
  return (
    <div className='app'>
      <img src={wlLogo} alt='Worldline Logo'className='logo'/>
      <h1 className='title'>RDG Accounting Periods Calendar</h1>
      <div className='calendar-container'>
        <MyCalendar />
      </div>
    </div>
  );
}

export default App;