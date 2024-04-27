import AuthorizationError from '../errors/AuthorizationError.js';
import AuthenticationError from '../errors/AuthenticationError.js';

export const isAuthenticate = (req, res, next) => {
  const { user } = res.locals;
  if (!user) {
    return next(new AuthenticationError('Authentication required'));
  }

  return next();
};

export const isAdmin = (req, res, next) => {
  const { user } = res.locals;
  if (!user.role || user.role !== 'ADMIN') {
    return next(new AuthorizationError('Authorization required'));
  }

  return next();
};
