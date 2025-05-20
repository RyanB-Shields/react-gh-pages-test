import React, { useState } from 'react'
import './keyMenu.css'

function KeyMenu(props) {
  const [show, setShow] = useState();

  return (
    <div className="key-menu-container">
      <h2 className="key-menu-title">Key</h2>
      <button id="bank-hols-btn" className="key-menu-btn" 
        onClick={() => {
          setShow(!show);
          props.toggleBankHolidays();
        }}
      > Bank Holidays </button>
      <button id="period-start-btn" className="key-menu-btn" 
        onClick={() => {
          setShow(!show);
          props.togglePeriodStart();
        }} 
        > Peridod Start </button>
      <button id="period-end-btn" className="key-menu-btn"
        onClick={() => {
          setShow(!show);
          props.togglePeriodEnd();
        }} 
        > Period End </button>
    </div>
  );
}

export default KeyMenu