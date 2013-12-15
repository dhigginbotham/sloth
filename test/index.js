var expect = require('expect.js'),
    sloth = require('../lib');

describe('sloth setup test', function () {

  var s = new sloth({
    delay: '3s'
  });

  it('should be able to inherit values from options', function (done) {

    expect(s.delay).to.be('3s');

    return done();

  });

  it('should slow down firing a function until the delay is met', function (done) {

    var time = Date.now();

    var fireMeLater = function (orig) {

      var t = Date.now();

      expect(t - orig).to.be.within(0, 100);

      return done();

    };

    s.mon(function (fn) {

      return fn(time);

    }, fireMeLater);

  });

  it('should slow down every request after the first', function (done) {
    
    var time = Date.now();

    var fireMeSecond = function (orig) {

      var t = Date.now();

      expect(t - orig).to.be.within(3000, 3015);

      return done();

    };

    s.mon(function (fn) {

      return fn(time);

    }, fireMeSecond);

  });

});