import ResponseError from './ResponseError.js';

/**
 * Represents an authorization error.
 * @extends ResponseError
 */
class AuthorizationError extends ResponseError {
  /**
   * Constructs a new AuthorizationError instance.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

export default AuthorizationError;
