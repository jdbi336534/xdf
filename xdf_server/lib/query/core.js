var User = require('./user');
var Director = require('./director');
var Renewals = require('./renewals');
var Subject = require('./subject');

module.exports = {
  get $User () {
    return User;
  },
  get $Director () {
    return Director;
  },
   get $Renewals () {
    return Renewals;
  },
  get $Subject () {
    return Subject;
  }
};