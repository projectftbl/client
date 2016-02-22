var express = require('express')
  , logger = require('morgan')
  , compression = require('compression')
  , history = require('connect-history-api-fallback')
  , configuration = require('@ftbl/configuration')
  , authom = require('./authom')
  , ssl = require('./ssl')
  , proxy = require('./proxy');

module.exports = function server(folder, done) {
  var app = express();

  authom(app);

  app.use(ssl());
  app.use('/api', proxy(configuration('host')));

  if (process.env.LOG_LEVEL !== 'warn') {
    app.use(logger('combined', { skip: function(req, res) { return res.statusCode === 304; }}));
  }

  app.use(compression())
  app.use(history());
  app.use(express.static(folder, { etag: true }));
  app.enable('trust proxy');

  app.listen(process.env.PORT || 4200, function() {
    console.log('%d listening on port %d', process.pid, this.address().port);
    if (done) done();
  });    
};
