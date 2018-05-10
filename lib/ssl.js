var configuration = require('./configuration');

module.exports = function ssl() {
  var noSSL = !configuration('http:secure');

  return function(req, res, next) {
    var protocol = req.headers['x-forwarded-proto']
      , isAzure = req.headers['x-site-deployment-id']
      , isSSL = req.headers['x-arr-ssl'];

    if (noSSL || protocol === 'https' || req.secure || (isAzure && isSSL)) return next();
      
    res.redirect('https://' + req.headers.host + req.url);
  }
};
