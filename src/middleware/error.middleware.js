import Joi from 'joi';
import { MulterError } from 'multer';
import ResponseError from '../errors/ResponseError.js';
import logger from '../utils/logging.js';
import Response from '../utils/Response.js';

const { ValidationError } = Joi;

/**
 * Error handler middleware to process various types of errors and respond with appropriate HTTP status codes and messages.
 * It handles custom response errors, validation errors from Joi, multer errors for file uploads, and generic server errors.
 *
 * @param {Error} err - The error object caught by the middleware.
 * @param {Request} req - The express request object.
 * @param {Response} res - The express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @return {void} - This function does not return a value. It sends a response to the client.
 */
const errorHandler = (err, req, res, next) => {
  const response = new Response();

  if (err instanceof ResponseError) {
    // Handle custom response errors
    logger.error(err.message);
    res
      .status(err.code)
      .json(response.error({ code: err.code, error: err.message }));
  } else if (err instanceof ValidationError) {
    // Handle validation errors from Joi
    const details = err.details.map((detail) => detail.message);
    logger.error(err.message);
    res
      .status(400)
      .json(
        response.error({ code: 400, error: 'Validation error', data: details }),
      );
  } else if (err instanceof MulterError) {
    // Handle file upload errors from Multer
    const multerErrorMessage =
      {
        LIMIT_PART_COUNT: 'Too many parts',
        LIMIT_FILE_SIZE: 'File too large',
        LIMIT_FILE_COUNT: 'Too many files',
        LIMIT_FIELD_KEY: 'Too many field keys',
        LIMIT_FIELD_VALUE: 'Too many field values',
        LIMIT_FIELD_COUNT: 'Too many fields',
        LIMIT_UNEXPECTED_FILE: 'Invalid file type',
      }[err.code] || 'Error while uploading file';

    logger.error(err.message);
    res
      .status(400)
      .json(response.error({ code: 400, error: multerErrorMessage }));
  } else {
    // Handle generic server errors
    logger.error(err.stack);
    res
      .status(500)
      .json(response.error({ code: 500, error: 'Internal server error' }));
  }

  // Call next middleware (if any) with the error
  next(err);
};

export default errorHandler;
