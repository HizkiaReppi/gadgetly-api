import ResponseError from './ResponseError.js';

/**
 * Represents a NotFoundError.
 * @extends ResponseError
 */
class NotFoundError extends ResponseError {
  /**
   * Constructs a NotFoundError with the specified message.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
