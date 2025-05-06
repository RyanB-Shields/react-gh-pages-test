import { useState } from 'react';
import Calendar from 'react-calendar';
import './App.css';
import wlLogo from "./images/worldline-mint-horizontal.png";
import 'react-calendar/dist/Calendar.css';

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='app'>
      <img src={wlLogo} alt='Worldline Logo'className='logo'/>
      <h1 className='title'>RDG Accounting Periods Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default App;
