var authom = require('authom')
  , configuration = require('@ftbl/configuration');

module.exports = function(app) {
  var send = function(req, res, data) {
    var host = configuration('client');
    res.send("<script>window.opener.postMessage('" + JSON.stringify(data) + "', '" + host + "'); window.close();</script>");
  };

  authom.createServer({
    service: 'twitter'
  , id: configuration('twitter:id')
  , secret: configuration('twitter:secret')
  });

  app.get('/auth/:service', authom.app);

  authom.on('auth', send);

  authom.on('error', function(req, res, data) {
    send(req, res, { error: data });
  });
};
