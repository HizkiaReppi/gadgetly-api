import winston, { format, transports } from 'winston';
import moment from 'moment';

const { combine, printf } = format;

/**
 * Get the color based on the log level.
 *
 * @param {string} level - The log level.
 * @return {string} The color code.
 */
function getColor(level) {
  switch (level) {
    case 'info':
      return '\x1b[36m'; // Cyan
    case 'warn':
      return '\x1b[33m'; // Yellow
    case 'error':
      return '\x1b[31m'; // Red
    default:
      return '\x1b[0m'; // Default color (reset)
  }
}

const logFormat = printf(({ level, message, timestamp }) => {
  const color = getColor(level);
  return `${color}${timestamp} | ${level}: ${message}\x1b[0m`;
});

const customTimestamp = format((info) => {
  // eslint-disable-next-line no-param-reassign
  info.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  return info;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(customTimestamp(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/server.log' }),
  ],
});

export default logger;
