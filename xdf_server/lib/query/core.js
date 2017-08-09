var User = require('./user');
var Director = require('./director');
var Renewals = require('./renewals');

module.exports = {
  get $User () {
    return User;
  },
  get $Director () {
    return Director;
  },
   get $Renewals () {
    return Renewals;
  }
};