var configuration = require('@ftbl/configuration');

module.exports = function ssl() {
  return function(req, res, next) {
    var protocol = req.headers['x-forwarded-proto']; 

    if (configuration('node:env') !== 'production' || !configuration('http:secure') || protocol === 'https' || this.secure) {
      return next();
    }
      
    res.redirect('https://' + req.headers.host + req.url);
  }
};