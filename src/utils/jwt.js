import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const generateToken = (payload, options = null) => {
  return jwt.sign(payload, config.jwt.privateKey, {
    ...options,
    algorithm: 'RS256',
  });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.publicKey, {
      algorithms: ['RS256'],
    });

    return {
      isValid: true,
      expired: false,
      credentials: decoded,
    };
  } catch (error) {
    return {
      isValid: false,
      expired: error.message === 'JWT kadaluarsa atau tidak dapat digunakan',
      credentials: null,
    };
  }
};
