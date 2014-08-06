browsersync-ssi
===============

SSI middleware for browser-sync


```
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
