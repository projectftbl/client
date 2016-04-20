var express = require('express')
  , compression = require('compression')
  , history = require('connect-history-api-fallback')
  , configuration = require('@ftbl/configuration')
  , logger = require('./logger')
  , authom = require('./authom')
  , ssl = require('./ssl')
  , proxy = require('./proxy');

module.exports = function server(folder) {
  var app = express();

  authom(app);

  app.use(logger());
  app.use(ssl());
  app.use('/api', proxy(configuration('host')));

  app.use(compression())
  app.use(history());
  app.use(express.static(folder, { etag: true }));
  app.enable('trust proxy');

  return app;
};
