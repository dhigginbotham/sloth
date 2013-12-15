var expect = require('expect.js'),
    sloth = require('../lib');

describe('sloth simple ratelimit test', function () {

  var s = new sloth({
    delay: '35',
    after: 1
  });

  it('should be able to inherit values from options', function (done) {

    expect(s.delay).to.be('35');

    return done();

  });

  it('should slow down fn firing', function (done) {

    var time = Date.now();

    var doThisLater = function (t) {

      var ts = Date.now() - t;

      expect(ts).to.be.within(0, 40);
      
      return done();

    };

    expect(Date.now() - time).to.be.within(0,20);

    s.limit(function () {

      return doThisLater(time);

    });

  });

  it('should loop through items and fire at different times', function (done) {
    
    var ntime = [];

    [1,2,3].forEach(function (item, i) {

      var time = Date.now();

      s.limit(function () {

        ntime.push((Date.now() - time) * item);

        expect(ntime[i]).to.be.within(30,500);

        if (ntime.length == 3) return done();

      });

    });

  });

});