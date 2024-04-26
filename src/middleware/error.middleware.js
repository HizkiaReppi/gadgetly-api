import Joi from 'joi';
import ResponseError from '../errors/ResponseError.js';
import logger from '../utils/logging.js';
import Response from '../utils/Response.js';

const { ValidationError } = Joi;

/**
 * Error handler middleware.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The express request object.
 * @param {Response} res - The express response object.
 * @param {Function} next - The next middleware function.
 * @return {void}
 */
const errorHandler = (err, req, res, next) => {
  const response = new Response();

  if (err instanceof ResponseError) {
    logger.error(err.message);
    res
      .status(err.code)
      .json(response.error({ code: err.code, error: err.message }));
  } else if (err instanceof ValidationError) {
    const details = [];

    err.details.forEach((detail) => {
      details.push(detail.message);
    });

    logger.error(err.message);
    res.status(400).json(
      response.error({
        code: 400,
        error: 'Validation error',
        data: details,
      }),
    );
  } else {
    logger.error(err.stack);
    res
      .status(500)
      .json(response.error({ code: 500, error: 'Internal server error' }));
  }

  next();
};

export default errorHandler;
