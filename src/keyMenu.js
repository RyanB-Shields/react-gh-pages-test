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
      <button id="periods-start-btn" className="key-menu-btn" 
        onClick={() => {
          setShow(!show);
          props.togglePeriodsStart();
        }} 
        > Period Start </button>
      <button id="periods-end-btn" className="key-menu-btn"
        onClick={() => {
          setShow(!show);
          props.togglePeriodsEnd();
        }} 
        > Period End </button>
    </div>
  );
}

export default KeyMenu