import React, { Component } from 'react';
import CalendarDays from './calendarDays.js';
import KeyMenu from './keyMenu.js';
import Periods from './periods.js';
import './calendar.css'

export default class Calendar extends Component {


  // Constructor ///////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date(),
      showBankHolidays: true, 
      showPeriodsStart: true,
      showPeriodsEnd: true,
      periodsStart: [],
      periodsEnd: []
    }
  }

  // Calendar Navigation /////////////////////////////////////////////////////////////////////////////////////////////
  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) }, () => {
      this.getPeriodsStart();
      this.getPeriodsEnd();
    });
  }

  nextMonth = () => {
    this.setState(
      { currentDay: new Date(this.state.currentDay.setMonth(this.state.currentDay.getMonth() + 1)) },
      () => {
        this.getPeriodsStart();
        this.getPeriodsEnd();
      }
    );
  }

  previousMonth = () => {
    this.setState(
      { currentDay: new Date(this.state.currentDay.setMonth(this.state.currentDay.getMonth() - 1)) },
      () => {
        this.getPeriodsStart();
        this.getPeriodsEnd();
      }
    );
  }

  // Key Menu Functions ///////////////////////////////////////////////////////////////////////////////////////////
  toggleBankHolidays = () => {
    this.setState((prevState) => ({ showBankHolidays: !prevState.showBankHolidays }));
  };

  togglePeriodsStart = () => {
    this.setState((prevState) => ({ showPeriodsStart: !prevState.showPeriodsStart }));
  };

  togglePeriodsEnd = () => {
    this.setState((prevState) => ({ showPeriodsEnd: !prevState.showPeriodsEnd }));
  }

  // Get Calendar data /////////////////////////////////////////////////////////////////////////////////////////

  // Fetch Bank Holidays from gov.uk API
  BANK_HOLIDAYS_API = 'https://www.gov.uk/bank-holidays.json';
  componentDidMount = async () => {
    await this.getBankHols();
    this.getPeriodsStart();
    this.getPeriodsEnd();
  }

  getBankHols = async () => {
    const response = await fetch(this.BANK_HOLIDAYS_API);
    const data = await response.json();
    this.setState({
        bankHolidays: data['england-and-wales'].events.map(event => new Date(event.date).toDateString())
    });
  }

  // Get Period dates from periods.js
  getPeriodsStart = () => {
    const data = Periods({ day: this.state.currentDay });
    this.setState({
      periodsStart: data.map(periods => new Date(periods.start).toDateString())
    });
  }

  getPeriodsEnd = () => {
    const data = Periods({ day: this.state.currentDay });
    this.setState({
      periodsEnd: data.map(periods => new Date(periods.end).toDateString())
    });
  }
  
  // Render the Calendar
  render() {
    return (
      <div className="calendar-container">
        <KeyMenu 
          toggleBankHolidays={this.toggleBankHolidays}
          togglePeriodsStart={this.togglePeriodsStart}
          togglePeriodsEnd={this.togglePeriodsEnd} 
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
              periodsStart={this.state.periodsStart || []}
              showPeriodsStart={this.state.showPeriodsStart}
              periodsEnd={this.state.periodsEnd || []}
              showPeriodsEnd={this.state.showPeriodsEnd}
            />
          </div>
        </div>
        <br></br>
      </div>
    )
  }
}