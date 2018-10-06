const winston = require("winston");

const level = process.env.LOGGER_LEVEL || 'debug';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level,
      timestamp: () => (new Date()).toISOString(),
    })
  ]
});

module.exports = logger
