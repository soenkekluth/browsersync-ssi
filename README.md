browsersync-ssi
===============

SSI middleware for browser-sync


```
var ssi = require('browsersync-ssi');

browserSync({

  server: {
    baseDir: ['src'],

    middleware: ssi({
      baseDir: __dirname + '/src',
      ext: '.shtml'
    })

  },
});
```
