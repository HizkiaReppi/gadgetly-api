import {
  createSellerSchema,
  getAllSellerSchema,
  getSellerByIdSchema,
  updateSellerSchema,
} from '../validations/sellers.validation.js';
import validate from '../utils/validation.js';
import prisma from '../utils/database.js';
import NotFoundError from '../errors/NotFoundError.js';
import { createPreSignedUrl } from './storage.service.js';

const _checkUserDataExistence = async (userId) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!isUserExists) throw new NotFoundError('Pengguna tidak ditemukan.');
};

const _checkSellerDataExistence = async (sellerId) => {
  const isSellerExists = await prisma.seller.findUnique({
    where: {
      id: sellerId,
    },
  });
  if (!isSellerExists) throw new NotFoundError('Penjual tidak ditemukan.');
};

const create = async (payload) => {
  const data = await validate(createSellerSchema, payload);

  await _checkUserDataExistence(data.user_id);

  const seller = await prisma.seller.create({
    data: {
      user_id: data.user_id,
      domicile: data.domicile,
      address: data.address,
      phone: data.phone,
    },
  });

  return seller;
};

const findAll = async (limit, page) => {
  const data = await validate(getAllSellerSchema, { limit, page });
  const skip = (data.page - 1) * data.limit;
  const sellers = await prisma.seller.findMany({
    skip,
    take: data.limit,
    orderBy: {
      user: {
        name: 'asc',
      },
    },
    select: {
      id: true,
      user: {
        select: {
          name: true,
          last_login: true,
        },
      },
      domicile: true,
      phone: true,
      created_at: true,
      updated_at: true,
    },
  });

  return sellers;
};

const findBySellerId = async (id) => {
  const data = await validate(getSellerByIdSchema, { id });

  const seller = await prisma.seller.findUnique({
    where: { id: data.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          photo: true,
          last_login: true,
          username: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
      },
      Product: true,
    },
  });

  if (!seller) throw new NotFoundError('Penjual tidak ditemukan.');

  if (seller?.user?.photo && seller?.user?.photo.startsWith('images/')) {
    const photo = await createPreSignedUrl(seller.user.photo);

    seller.user.photo = photo;
  }

  return seller;
};

const findByUserId = async (id) => {
  const data = await validate(getSellerByIdSchema, { id });

  const seller = await prisma.seller.findUnique({
    where: { user_id: data.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          photo: true,
          last_login: true,
          username: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
      },
      Product: true,
    },
  });

  if (!seller) throw new NotFoundError('Penjual tidak ditemukan.');

  if (seller?.user?.photo && seller?.user?.photo.startsWith('images/')) {
    const photo = await createPreSignedUrl(seller.user.photo);

    seller.user.photo = photo;
  }

  return seller;
};

const update = async (id, payload) => {
  const data = await validate(updateSellerSchema, payload);
  await _checkSellerDataExistence(id);

  const user = await prisma.seller.update({
    where: { id },
    data: {
      user_id: data.user_id,
      domicile: data.domicile,
      address: data.address,
      phone: data.phone,
    },
  });

  return user;
};

const destroy = async (id) => {
  const data = await validate(getSellerByIdSchema, { id });
  await _checkSellerDataExistence(id);

  await prisma.seller.delete({
    where: { id: data.id },
  });

  return true;
};

const count = async () => {
  const totalData = await prisma.seller.count();
  return totalData;
};

export default {
  create,
  findAll,
  findBySellerId,
  findByUserId,
  update,
  destroy,
  count,
};
