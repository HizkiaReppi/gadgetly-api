import logger from '../utils/logging.js';

/**
 * Middleware for logging requests.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
function loggingMiddleware(req, res, next) {
  const { method, originalUrl } = req;

  const logMessage = `${method} ${originalUrl}`;
  logger.info(logMessage);

  next();
}

export default loggingMiddleware;
