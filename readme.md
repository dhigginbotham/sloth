## sloth function rate-limiter
rate limit functions and enforce it with context.

![sloth](http://i.imgur.com/YEZm3Pk.jpg?1)

### opts
`delay` defaults to `25ms` uses the [`ms`](https://github.com/guille/ms.js) module for super easy time.

`after` defaults to `1`, and doesn't start limiting until after the first request.

### usage

```js

var Sloth = require('sloth'),
    sloth = new Sloth({
      delay: '25ms',
      after: 1
    });

var doLater = function (orig) {
  return Date.now() - orig;
};

[1,2,3].forEach(function (item) {
  
  var time = Date.now();

  sloth.limit(function () {

    doLater(time);

  });

});


``` 