var configuration = require('@ftbl/configuration');

module.exports = function ssl() {
  var noSSL = !configuration('http:secure');

  return function(req, res, next) {
    var protocol = this.request.headers['x-forwarded-proto']; 

    if (noSSL || protocol === 'https' || this.secure) return next();
      
    res.redirect('https://' + req.headers.host + req.url);
  }
};
