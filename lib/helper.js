import dateFns from "date-fns";

export function isToday() {
  return dateFns.isToday(new Date());
}

export const daysOfWeek = [
  { short: "Mon", long: "Monday" },
  { short: "Tue", long: "Tuesday" },
  { short: "Wed", long: "Wednesday" },
  { short: "Thu", long: "Thursday" },
  { short: "Fri", long: "Friday" },
  { short: "Sat", long: "Saturday" },
  { short: "Sun", long: "Sunday" }
];

//parses string such as "Mon - Fri" and returns array of days open, in long format.
export function getDaysOpen(dateRange) {
  // matches either "Mon-Fri" or "Mon - Fri"
  const dates = dateRange.split(/s?-s?/);

  //trim excess whitespace before finding index
  const startIndex = daysOfWeek.findIndex(day => day.short == dates[0].trim());
  const endIndex = daysOfWeek.findIndex(day => day.short == dates[1].trim());

  const daysOpen = [];
  for (let i = startIndex; i <= endIndex; i++) {
    daysOpen.push(daysOfWeek[i].long);
  }
  return daysOpen;
}
