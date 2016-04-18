var logger = require('morgan')
  , log = require('@ftbl/log');

module.exports = function() {
  return logger('combined', { 
    skip: function(req, res) { return res.statusCode === 304; }
  , stream: {
      write: function(message) {
        log.info(message);
      }
    }
  });
};