var request = require('request')
  , configuration = require('./configuration');

module.exports = function proxy(host) {
  var user = configuration('http:authenticate')
    , auth = null;
  
  if (user != null) {
    var parts = user.split('/');
    auth = { auth: { user: parts[0], pass: parts[1] }};
  }

  return function(req, res) {
    var url = host + req.url.replace(/^\/api/, '');
    req.pipe(request(url, auth)).pipe(res);
  }
};