function CalendarDays(props) {
  const firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
      today: (firstDayOfMonth.toDateString() === new Date().toDateString()),
      year: firstDayOfMonth.getFullYear()
    }

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {
        currentDays.map((day) => {
          const isBankHoliday = props.bankHolidays.includes(day.date.toDateString());
          const isPeriodsStart = props.periodsStart.includes(day.date.toDateString());
          const isPeriodsEnd = props.periodsEnd.includes(day.date.toDateString());
  
          return (
            <div 
              className={
                "calendar-day" + 
                (day.currentMonth ? " current" : "") + 
                (day.selected ? " selected" : "") + 
                (day.today ? " today" : "") +
                (isBankHoliday && props.showBankHolidays ? " bank-holidays" : "") +
                (isPeriodsStart && props.showPeriodsStart ? " periods-start" : "") +
                (isPeriodsEnd && props.showPeriodsEnd ? " periods-end" : "")

              }
              onClick={() => props.changeCurrentDay(day)}
            >
              <p>{day.number}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default CalendarDays;