import ResponseError from './ResponseError.js';

/**
 * Represents an authentication error.
 * @extends ResponseError
 */
class AuthenticationError extends ResponseError {
  /**
   * Constructs a new AuthenticationError instance.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export default AuthenticationError;
