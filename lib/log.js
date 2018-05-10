var configuration = require('./configuration');

var pkg = require(process.cwd() + '/package.json')
  , level = configuration('logging:level')
  , type = configuration('logging:type') || 'console';

module.exports = require('./' + type)(pkg.name, level);
