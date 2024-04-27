/* eslint-disable no-underscore-dangle */
import {
  createUserSchema,
  getAllUserSchema,
  getUserByEmailSchema,
  getUserByIdSchema,
  getUserByUsernameSchema,
  updateUserSchema,
  updateUserPasswordSchema,
} from '../validations/users.validation.js';
import { hash, compare } from '../utils/bcrypt.js';
import validate from '../utils/validation.js';
import prisma from '../utils/database.js';
import ResponseError from '../errors/ResponseError.js';
import NotFoundError from '../errors/NotFoundError.js';

const _findByEmail = async (email) => {
  const data = await validate(getUserByEmailSchema, { email });

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  return user;
};

const _findByUsername = async (username) => {
  const data = await validate(getUserByUsernameSchema, { username });

  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });

  return user;
};

const _checkDataExistence = async (username, email) => {
  const isEmailExists = await _findByEmail(email);
  if (isEmailExists) throw new ResponseError('Email telah terdaftar.', 400);

  const isUsernameExists = await _findByUsername(username);
  if (isUsernameExists)
    throw new ResponseError('Username telah terdaftar.', 400);
};

const create = async (payload) => {
  const data = await validate(createUserSchema, payload);

  await _checkDataExistence(data.username, data.email);

  const hashedPassword = await hash(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      created_at: true,
    },
  });

  return user;
};

const findAll = async (limit, page) => {
  const data = await validate(getAllUserSchema, { limit, page });
  const skip = (data.page - 1) * data.limit;
  const users = await prisma.user.findMany({
    skip,
    take: data.limit,
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!users || users.length < 1) {
    throw new NotFoundError('Pengguna tidak ditemukan.');
  }

  return users;
};

const findById = async (id) => {
  const data = await validate(getUserByIdSchema, { id });

  const user = await prisma.user.findUnique({
    where: { id: data.id },
  });

  return user;
};

const update = async (id, payload) => {
  const data = await validate(updateUserSchema, payload);

  const isUserExist = await findById(id);
  if (!isUserExist) throw new NotFoundError('Pengguna tidak ditemukan.');

  const user = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      updated_at: true,
    },
  });

  return user;
};

const updatePassword = async (id, payload) => {
  const data = await validate(updateUserPasswordSchema, payload);

  const user = await findById(id);
  if (!user) throw new NotFoundError('Pengguna tidak ditemukan.');

  const isPasswordMatch = await compare(data.old_password, user.password);
  if (!isPasswordMatch) {
    throw new ResponseError('Password lama tidak sesuai.', 400);
  }

  const hashedPassword = await hash(data.password);

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      updated_at: true,
    },
  });

  return updatedUser;
};

const destroy = async (id) => {
  const data = await validate(getUserByIdSchema, { id });

  const isUserExist = await findById(data.id);
  if (!isUserExist) throw new NotFoundError('Pengguna tidak ditemukan.');

  return prisma.user.delete({
    where: { id: data.id },
  });
};

const count = async () => {
  const totalData = await prisma.user.count();
  return totalData;
};

export default {
  create,
  findAll,
  findById,
  update,
  updatePassword,
  destroy,
  count,
};
