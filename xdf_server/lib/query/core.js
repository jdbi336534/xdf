var User = require('./user');
var Director = require('./director');

module.exports = {
  get $User () {
    return User;
  },
  get $Director () {
    return Director;
  }
};