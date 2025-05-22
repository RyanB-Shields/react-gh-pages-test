function Periods(props) {
  // Get the first/last day of April and last day of March
  // Note: Months are 0-indexed in JavaScript
  // April is month 3, March is month 2

  //First period starts on 1st April
  const firstPeriodStart = new Date(props.day.getFullYear(), 3, 1);

  //Fist period end on last saturday of April
  const firstPeriodEnd = new Date(props.day.getFullYear(), 3, 30);
  firstPeriodEnd.setDate(firstPeriodEnd.getDate() - (firstPeriodEnd.getDay() + 1) %7);

  //Last period ends on last day of March next year
  const lastPeriodEnd= new Date(props.day.getFullYear() +1, 2, 31);
  
  // Empty varaibles to hold the start and end dates of periods
  let periodStart = new Date();
  let periodEnd = new Date();
  let periods = [];

  //for loop to create period start and end dates and push them to the periods array
  for (let period = 1; period <= 13; period++) {
   
    if (period === 1) {
      periodStart = new Date(firstPeriodStart);
      //should change depenpidng on last saturday of April
      periodEnd = new Date(firstPeriodEnd);
    } else if (period === 13) {
      periodStart = new Date(periodEnd);
      periodStart.setDate(periodStart.getDate() + 1);
      periodEnd = new Date(lastPeriodEnd);
    } else {
      periodStart = new Date(periodEnd);
      periodStart.setDate(periodStart.getDate() + 1);
      periodEnd = new Date(periodStart);
      periodEnd.setDate(periodEnd.getDate() + 27); // 4 weeks including the start date
    }

    // Add the period start and end dates to the array
    periods.push({
      period: period,
      start: periodStart.toDateString(),
      end: periodEnd.toDateString()
    });
  }

  return (periods);
}
export default Periods;