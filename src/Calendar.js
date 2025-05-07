import React, { Component } from 'react';
import CalendarDays from './calendarDays';
import './calendar.css'

export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date()
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
        <div className="calendar-body">
          <div className="table-header">
            {
              this.weekdays.map((weekday) => {
                return <div className="weekday"><p>{weekday}</p></div>
              })
            }
          </div>
          <CalendarDays day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} />
        </div>
      </div>
    )
  }
}