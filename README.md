browsersync-ssi
===============

SSI middleware for browser-sync


```
var ssi = require('browsersync-ssi');

browserSync({

  server: {
    baseDir: ['app'],

    middleware: ssi({
      baseDir: __dirname + '/app',
      ext: '.shtml',
      version: '1.4.0'
    })

  },
});
```
