import { useState } from 'react';
import Calendar from 'react-calendar';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import wlLogo from "./images/worldline-mint-horizontal.png";

function App() {
  const [date1, setDate1] = useState(new Date(2025, 3, 1));
  const [date2, setDate2] = useState(new Date(2025, 4, 1));

  return (
    <div className='app'>
      <img src={wlLogo} alt='Worldline Logo'className='logo'/>
      <h1 className='title'>RDG Accounting Periods Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate1} defaultValue={date1} />
        <Calendar onChange={setDate2} defaultValue={date2} />
      </div>
    </div>
  );
}

export default App;
