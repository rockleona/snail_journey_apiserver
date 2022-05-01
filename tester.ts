const time = new Date(Date.now());
const datestring = time.toDateString();
// const datestring = time.toDateString();
const parsed = Date.parse(datestring);
const aDay = 1000 * 60 *60 * 24;

console.log(typeof datestring)
console.log(datestring)
console.log(typeof parsed)
console.log(parsed)

const nextDayNumber = parsed + aDay;
const nextDay = new Date(nextDayNumber)

const nextString = nextDay.toDateString();

console.log(nextString)
// console.log(nextString)