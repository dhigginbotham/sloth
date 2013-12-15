var expect = require('expect.js'),
    sloth = require('../lib');

describe('sloth simple ratelimit test', function () {

  var s = new sloth({
    delay: '35ms'
  });

  it('should be able to inherit values from options', function (done) {

    expect(s.delay).to.be('35ms');

    return done();

  });

  it('should fire for the first time quickly', function (done) {

    var time = Date.now();

    var fireMeFirst = function (orig) {

      var t = Date.now();

      expect(t - orig).to.be.within(0, 20);

      return done();

    };

    s.mon(function (fn) {

      return fn(time);

    }, fireMeFirst);

  });

  it('should slow down every request after the first', function (done) {
    
    var time = Date.now();

    var fireMeSecond = function (orig) {

      var t = Date.now();

      expect(t - orig).to.be.within(35, 50);

      return done();

    };

    s.mon(function (fn) {

      return fn(time);

    }, fireMeSecond);

  });

});