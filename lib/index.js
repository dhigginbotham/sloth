var ms = require('ms');

var inherit = function (src, dest) {

  for (var o in src) {

    if (dest.hasOwnProperty(o)) {
      src[o] = dest[o];
    };

  };

  return src;

};

var Sloth = function (opts) {

  this.delay = '35ms';
  this.after = null;

  if (opts) inherit(this, opts);

  if (!this.after) this.after = 1;

  this._count = 0;

  return this;

};

Sloth.prototype.mon = function (fn, callback) {

  var self = this;

  if (this._count >= this.after) {

    setTimeout(function () {

      ++self._count;

      return fn((callback) ? callback : null);

    }, ms(this.delay));
  
  } else {

    ++this._count;

    return fn((callback) ? callback : null);

  };

};

module.exports = Sloth;