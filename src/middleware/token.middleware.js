import { verifyToken } from '../utils/jwt.js';

const deserializeTokenMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader?.split(' ')[1];

  if (!accessToken) {
    return next();
  }

  const { isValid, expired, credentials } = verifyToken(accessToken);

  if (credentials) {
    res.locals.user = credentials;
    return next();
  }

  if (expired || isValid === false) {
    return next();
  }

  return next();
};

export default deserializeTokenMiddleware;
