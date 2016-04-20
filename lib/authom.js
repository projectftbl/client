var authom = require('authom')
  , configuration = require('@ftbl/configuration');

module.exports = function(app) {
  var host = function(headers) {
    if (headers.host) {
      return (configuration('http:secure') ? 'https' : 'http') + '://' + headers.host;
    }
    return configuration('client');
  };

  var send = function(req, res, data) {
    res.send("<script>window.opener.postMessage('" + JSON.stringify(data) + "', '" + host(req.headers) + "'); window.close();</script>");
  };

  authom.createServer({
    service: 'twitter'
  , id: configuration('twitter:id')
  , secret: configuration('twitter:secret')
  });

  authom.createServer({
    service: 'google'
  , id: configuration('google:id')
  , secret: configuration('google:secret')
  , scope: (configuration('google:scope') || []).concat('https://www.googleapis.com/auth/userinfo.profile')
  });

  app.get('/auth/:service', authom.app);

  authom.on('auth', send);

  authom.on('error', function(req, res, data) {
    send(req, res, { error: data });
  });
};
