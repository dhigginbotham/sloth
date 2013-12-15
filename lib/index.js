var ms = require('ms');

var inherit = function (src, dest) {

  // single level deep, nothing fancy
  // its good enough for this use though.

  for (var o in src) {
    if (dest.hasOwnProperty(o)) {
      src[o] = dest[o];
    };
  };

  return src;

};

var Sloth = function (opts) {

  this.delay = '35ms';
  this.after = 1;

  if (opts) inherit(this, opts);

  var count = 0;

  this.limit = function (fn) {

    var to = null;

    ++count;

    if (count > this.after) {
      return setTimeout(fn, ms(this.delay) * count);
    } else {
      return fn();
    };

  };

  return this;

};

module.exports = Sloth;