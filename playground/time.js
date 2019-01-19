const moment = require('moment');
// Jan 1st 1970 00:00:00 am
// let date = new Date();
// const months= ["Jan",'Feb'];

// console.log(date.getMonth());

// let date = moment();

// console.log(date.format('MMM Do, YYYY'));

//10:35 am
//6:01 am
let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
var createdAt= 1234;
let date = moment(createdAt);
console.log(date.format('h:mm a'));