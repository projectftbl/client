var nconf = require('nconf');

var environment = process.env.NODE_ENV || 'development';

nconf
.argv()
.env('_')
.file(environment, 'config/' + environment + '.json')
.file('default', 'config/default.json');
module.exports = function(key) {
  return nconf.get(key.toUpperCase());
};