import { loginSchema } from '../validations/auth.validation.js';
import { compare } from '../utils/bcrypt.js';
import {
  generateToken,
  updateLastLogin,
  updateRefreshToken,
} from '../utils/auth.js';
import validate from '../utils/validation.js';
import ResponseError from '../errors/ResponseError.js';
import NotFoundError from '../errors/NotFoundError.js';
import usersService from './users.service.js';

const register = async (payload) => {
  const user = await usersService.create(payload);

  const { accessToken, refreshToken } = await generateToken(user);
  await updateRefreshToken(user.id, refreshToken);
  await updateLastLogin(user.id);

  return { accessToken, refreshToken, id: user.id };
};

const login = async (payload) => {
  const data = await validate(loginSchema, payload);

  const user = await usersService.findByEmail(data.email);
  if (!user) throw new NotFoundError('Email atau Password salah');

  const isPasswordMatch = await compare(data.password, user.password);
  if (!isPasswordMatch) {
    throw new ResponseError('Email atau Password salah', 400);
  }

  const { accessToken, refreshToken } = await generateToken(user);
  await updateRefreshToken(user.id, refreshToken);
  await updateLastLogin(user.id);

  return { accessToken, refreshToken, id: user.id };
};

export default { register, login };
