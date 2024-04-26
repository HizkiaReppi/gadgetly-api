/**
 * Custom error class for handling response errors
 * @param {string} message - Error message
 * @param {number} code - HTTP status code
 * @example
 * throw new ResponseError('Not found', 404);
 */
class ResponseError extends Error {
  /**
   * Create a new ResponseError instance.
   * @param {string} message - Error message.
   * @param {number} code - HTTP status code.
   */
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export default ResponseError;
