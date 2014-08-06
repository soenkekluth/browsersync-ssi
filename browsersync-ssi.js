module.exports = function browserSyncSSI(opt) {

  'use strict';

  var ssi = require('ssi');
  var path = require('path');
  var fs = require('fs');

  var opt = opt || {};
  var ext = opt.ext || '.shtml';
  var baseDir = opt.baseDir || __dirname;
  var parser = new ssi(__dirname, baseDir, baseDir);


  return function(req, res, next) {

    var url = req.url === '/' ? ('/index' + ext) : req.url;
    var filename = baseDir + url;

    if (url.indexOf(ext) > -1 && fs.existsSync(filename)) {

      var contents = parser.parse(filename, fs.readFileSync(filename, {
        encoding: 'utf8'
      })).contents;

      //TODO get browser-sync-client.x.x.x.js version dynamicly
      //TODO inject more elegant using regexp
      contents = contents.split('</head>').join('<script async="" src="//' + req.headers.host + '/browser-sync-client.1.3.3.js"></script></head>');

      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(contents);

    } else {
      next();
    }

  };
};
