module.exports = function browserSyncSSI(opt) {

  'use strict';

  var ssi = require('ssi');
  var path = require('path');
  var fs = require('fs');

  var opt = opt || {};
  var ext = opt.ext || '.shtml';
  var baseDir = opt.baseDir || __dirname;
  var matcher = '/**/*' + ext;
  var version = opt.version || '1.4.0';

  var bsURL = version >= '1.4.0' ? '/browser-sync/browser-sync-client.' : '/browser-sync-client.';
  bsURL += version + '.js';

  var parser = new ssi(baseDir, baseDir, matcher);

  return function(req, res, next) {

    var url = req.url === '/' ? ('/index' + ext) : req.url;
    var filename = baseDir + url.split('?')[0];

    if (url.indexOf(ext) > -1 && fs.existsSync(filename)) {

      var contents = parser.parse(filename, fs.readFileSync(filename, {
        encoding: 'utf8'
      })).contents;

      //TODO inject more elegant using regexp
      contents = contents.replace(/<\/head>/, '<script async src="' + bsURL + '"></script></head>');

      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(contents);

    } else {
      next();
    }

  };
};
