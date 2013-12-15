## sloth
rate limit functions and enforce it with context.

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

var time = Date.now();

sloth.mon(function (fn) {
  return fn(time);
}, doLater);

``` 