///Testing Periods Highlight 
// currenlty does not work

import React, { Component } from 'react';
import CalendarDays from './calendarDays';
import KeyMenu from './keyMenu.js';
import Periods from './periods.js';
import './calendar.css'

export default class Calendar extends Component {

  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date(),
      showBankHolidays: true,
      showPeriodStart: true,
      showPeriodEnd: true
    }
  }


  // Calendar Navigation
  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  nextMonth = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setMonth(this.state.currentDay.getMonth() + 1)) });
  }

  previousMonth = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setMonth(this.state.currentDay.getMonth() - 1)) });
  }

  // Key Menu Functions
  toggleBankHolidays = () => {
    this.setState((prevState) => ({ showBankHolidays: !prevState.showBankHolidays }));
  };

  tooglePeriodStart = () => {
    this.setState((prevState) => ({ showPeriodStart: !prevState.showPeriodStart }));
  }

  tooglePeriodEnd = () => {
    this.setState((prevState) => ({ showPeriodEnd: !prevState.showPeriodEnd }));
  }

  // Get Calendar data 

  // Get Bank Holidays from gov.uk API
  BANK_HOLIDAYS_API = 'https://www.gov.uk/bank-holidays.json';
  componentDidMount = async () => {
    await this.getBankHols()
  }

  getBankHols = async () => {
    const response = await fetch(this.BANK_HOLIDAYS_API);
    const data = await response.json();
    this.setState({
        bankHolidays: data['england-and-wales'].events.map(event => new Date(event.date).toDateString())
    });
  }

  // Get Periods from periods.js
  getPeriodStart = () => {
    const data = Periods;
    this.setState({
      periods: data.periods.map(period => new Date(period.start).toDateString())
    });
  }

  getPeriodEnd = () => {
    const data = Periods;
    this.setState({
      periods: data.periods.map(period => new Date(period.end).toDateString())
    });
  }

  // Render the Calendar
  render() {
    return (
      <div className="calendar-container">
        <KeyMenu 
          toggleBankHolidays={this.toggleBankHolidays} 
          togglePeriodStart={this.tooglePeriodStart}
          togglePeriodEnd={this.tooglePeriodEnd}
        />
        <div className="calendar">
          <div className="calendar-header">
            <div className="calendar-title">
              <h2>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
            </div>
            <div className="tools">
              <button onClick={this.previousMonth}>
                <span className="material-icons">
                  arrow_back
                  </span>
              </button>
              <p>{this.months[this.state.currentDay.getMonth()].substring(0, 3)}</p>
              <button onClick={this.nextMonth}>
                <span className="material-icons">
                  arrow_forward
                  </span>
              </button>
            </div>
          </div>
          <div className="calendar-body">
            <div className="table-header">
              {
                this.weekdays.map((weekday) => {
                  return <div className="weekday"><p>{weekday}</p></div>
                })
              }
            </div>
            <CalendarDays 
              day={this.state.currentDay} 
              changeCurrentDay={this.changeCurrentDay} 
              bankHolidays={this.state.bankHolidays || []}
              showBankHolidays={this.state.showBankHolidays}
              periodStart={this.state.periodStart || []}
              showPeriodStart={this.state.showPeriodStart} 
              periodEnd={this.state.periodEnd || []}
              showperiodEnd={this.state.showPeriodEnd}

            />
          </div>
        </div>
      </div>
    )
  }
}