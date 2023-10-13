const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

//current date
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2023,9,1,10,30,0);
// month はindex numberなので5月なら4になる
//current date + add deadline time =>表示されている日付も変わる
const futureDate = new Date(tempYear,tempMonth,tempDay + 35,12,30,0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
// weekdays arrayの[]　[futureDate.getDay()]はindex numberを表している
giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  // t => 締め切りまでhow many ms
  // console.log(t);
//1s = 1000ms
//1m = 60s
// 1hr = 60mins
// 1d = 24hrs

//values in ms
const oneDay = 24*60*60*1000;
// how many ms in one day
const oneHour = 60*60*1000;
// how many ms in one hr
const oneMinute = 60 * 1000;
let days = t / oneDay;
// how many days left
days = Math.floor(days);
// 少数が出るので整数を求める
let hours = Math.floor((t % oneDay) /oneHour);
let minutes = Math.floor((t % oneHour) / oneMinute);
let seconds = Math.floor((t % oneMinute) / 1000);

//set values array;
const values = [days, hours, minutes, seconds];

function format(item) {
  if(item < 10){
    return item = `0${item}`
  }
  return item
}
items.forEach(function (item,index) {
  item.innerHTML = format(values[index]);
});
if(t < 0){
  clearInterval(countdown);
  deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`;
};
}
// count down
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
