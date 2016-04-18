var express = require('express')
  , compression = require('compression')
  , history = require('connect-history-api-fallback')
  , configuration = require('@ftbl/configuration')
  , logger = require('./logger')
  , authom = require('./authom')
  , ssl = require('./ssl')
  , proxy = require('./proxy');

module.exports = function server(folder, done) {
  var app = express();

  authom(app);

  app.use(logger());
  app.use(ssl());
  app.use('/api', proxy(configuration('host')));

  app.use(compression())
  app.use(history());
  app.use(express.static(folder, { etag: true }));
  app.enable('trust proxy');

  var port = process.env.PORT || 4200;

  app.listen(port, function() {
    console.log('%d listening on port %d', process.pid, port);
    if (done) done();
  });    
};
