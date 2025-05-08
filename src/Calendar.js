import React, { Component } from 'react';
import CalendarDays from './calendarDays';
import KeyMenu from './keyMenu.js';
import './calendar.css'

export default class Calendar extends Component {

  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date(),
      showBankHolidays: true // New state to toggle bank holidays
    }
  }

  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  nextMonth = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setMonth(this.state.currentDay.getMonth() + 1)) });
  }

  previousMonth = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setMonth(this.state.currentDay.getMonth() - 1)) });
  }

  toggleBankHolidays = () => {
    this.setState((prevState) => ({ showBankHolidays: !prevState.showBankHolidays }));
  };

  // Fetching Bank Holidays from the UK Government API
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
  

  render() {
    return (
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
        <KeyMenu toggleBankHolidays={this.toggleBankHolidays} />
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
            showBankHolidays={this.state.showBankHolidays} // Pass toggle state
          />
        </div>
      </div>
    )
  }
}