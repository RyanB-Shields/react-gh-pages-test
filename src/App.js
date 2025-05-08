import Calendar from './Calendar.js';
import './App.css';
import wlLogo from "./images/worldline-mint-horizontal.png";

function App() {
  return (
    <div className='app'>
      <img src={wlLogo} alt='Worldline Logo'className='logo'/>
      <h1 className='title'>RDG Accounting Periods Calendar</h1>
        <Calendar />
    </div>
  );
}

export default App;