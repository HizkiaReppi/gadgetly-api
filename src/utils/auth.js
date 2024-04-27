import config from '../config/config.js';
import prisma from './database.js';
import { generateToken as generateJwtToken } from './jwt.js';
import { hash } from './bcrypt.js';

/**
 * Update the refresh token of the user
 *
 * @param {string} userId
 * @param {string} refreshToken
 * @return {Promise<void>}
 */
export const updateRefreshToken = async (userId, refreshToken) => {
  const hashedRefreshToken = await hash(refreshToken);

  return prisma.user.update({
    where: { id: userId },
    data: { refresh_token: hashedRefreshToken },
  });
};

/**
 * Update the last login date of the user
 *
 * @param {string} userId
 * @return {Promise<void}
 */
export const updateLastLogin = async (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { last_login: new Date() },
  });
};

/**
 * Generate access and refresh token
 *
 * @param {object} data
 * @return {Promise<Object>}
 * @property {string} accessToken
 * @property {string} refreshToken
 */
export const generateToken = async (data) => {
  const accessToken = generateJwtToken(
    { ...data },
    { expiresIn: config.jwt.expiresIn },
  );
  const refreshToken = generateJwtToken(
    { ...data },
    { expiresIn: config.jwt.refreshIn },
  );

  return { accessToken, refreshToken };
};
