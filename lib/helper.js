import dateFns from "date-fns";

export function isToday() {
  return dateFns.isToday(new Date());
}

//ids are based on values returned from getDay() js method
export const daysOfWeek = [
  { short: "Mon", long: "Monday", id: 1 },
  { short: "Tue", long: "Tuesday", id: 2 },
  { short: "Wed", long: "Wednesday", id: 3 },
  { short: "Thu", long: "Thursday", id: 4 },
  { short: "Fri", long: "Friday", id: 5 },
  { short: "Sat", long: "Saturday", id: 6 },
  { short: "Sun", long: "Sunday", id: 0 }
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

export function getStringDate(id) {
  const dayOfWeek = daysOfWeek.find(day => day.id == id);
  return dayOfWeek.long;
}

export function getRandomIndex(min, max) {
  return Math.random() * (max - min) + min;
}
