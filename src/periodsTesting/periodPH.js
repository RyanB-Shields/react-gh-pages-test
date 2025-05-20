function Periods(props) {
  // Get the first/last day of April and last day of March
  // Note: Months are 0-indexed in JavaScript
  // April is month 3, March is month 2

  const firstDayOfApril = new Date(props.day.getFullYear(), 3, 1);
  // const lastDayofApril = new Date(props.day.getFullYear(), 3, 30); 
  const lastDayOfMarch = new Date(props.day.getFullYear() +1, 2, 31);
  
  let period1Length = 25;
  let periodStart = new Date(firstDayOfApril);
  let periodEnd = new Date();
  let periods = [];

  

  //for loop to create period start and end dates
  for (let period = 1; period <= 13; period++) {
   
    if (period === 1) {
      periodStart = new Date(firstDayOfApril);
      //should change depending on day of the week can't end on sunday?
      periodEnd = new Date(periodStart);
      periodEnd.setDate(periodEnd.getDate() + period1Length);
    } else if (period === 13) {
      periodStart = new Date(periodEnd);
      periodStart.setDate(periodStart.getDate() + 1);
      periodEnd = new Date(lastDayOfMarch);
    } else {
      periodStart = new Date(periodEnd);
      periodStart.setDate(periodStart.getDate() + 1);
      periodEnd = new Date(periodStart);
      periodEnd.setDate(periodEnd.getDate() + 27); // 4 weeks including the start date
    }

    // Add the period start and end dates to the array
    periods.push({
      period: period,
      start: periodStart.toLocaleDateString(),
      end: periodEnd.toLocaleDateString()
    });
  }

  return (
    <div className="periods-list">
      <table>
        <thead>
          <tr>
            <th>Period</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((period) => (
            <tr key={period.period}>
              <td>{period.period}</td>
              <td>{period.start}</td>
              <td>{period.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Periods;