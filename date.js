var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
var diff = todayTimeStamp - oneDayTimeStamp;
var yesterdayDate = new Date(diff);
var yesterdayString = yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();
