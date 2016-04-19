var logger = require('morgan')
  , configuration = require('@ftbl/configuration')
  , log = require('@ftbl/log');

module.exports = function() {
  var format = configuration('logging:format') || 'dev';

  return logger(format, { 
    skip: function(req, res) { return res.statusCode === 304; }
  , stream: {
      write: function(message) {
        log.info(message);
      }
    }
  });
};