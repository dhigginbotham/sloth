var ms = require('ms');

var Sloth = function (opts) {

  this.delay = '1s';

  return this;

};

Sloth.prototype.mon = function (fn) {

  setTimeout(function () {

    return fn;

  }, ms(this.delay));

};

module.exports = Sloth;