import bcrypt from 'bcrypt';
import config from '../config/config.js';

/**
 * Hash Data
 *
 * @param {string} data Data
 * @return {Promise<string>}
 */
export const hash = async (data) => {
  const salt = await bcrypt.genSalt(Number(config.bcrypt.saltRounds));
  return bcrypt.hash(data, salt);
};

/**
 * Compare Data with Hashed Data
 *
 * @param {string} data Data
 * @param {string} hashedData Hashed Data
 * @return {Promise<boolean>}
 */
export const compare = async (data, hashedData) => {
  return bcrypt.compare(data, hashedData);
};
