import {
  createCategorySchema,
  getAllCategorySchema,
  getCategoryBySlugSchema,
  getCategoryByIdSchema,
} from '../validations/categories.validation.js';
import validate from '../utils/validation.js';
import prisma from '../utils/database.js';
import ResponseError from '../errors/ResponseError.js';
import { generateSlug } from '../utils/format.js';
import NotFoundError from '../errors/NotFoundError.js';

const _checkDataExistence = async (name) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: { name },
  });

  if (isCategoryExists)
    throw new ResponseError('Category telah terdaftar.', 400);
};

const _checkCategoryExistence = async (id) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (!category) throw new NotFoundError('Category tidak ditemukan.');
};

const create = async (payload) => {
  const data = await validate(createCategorySchema, payload);

  await _checkDataExistence(data.name);

  const slug = generateSlug(data.name);

  const category = await prisma.category.create({
    data: {
      name: data.name,
      slug,
    },
  });

  return category;
};

const findAll = async (limit, page) => {
  const data = await validate(getAllCategorySchema, { limit, page });
  const skip = (data.page - 1) * data.limit;
  const categories = await prisma.category.findMany({
    skip,
    take: data.limit,
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      products: {
        select: {
          id: true,
          title: true,
          price: true,
          images: true,
          color: true,
          storage: true,
          ram: true,
        },
      },
      created_at: true,
      updated_at: true,
    },
  });

  if (!categories || categories.length < 1) {
    throw new NotFoundError('Category tidak ditemukan.');
  }

  return categories;
};

const findBySlug = async (slug) => {
  const data = await validate(getCategoryBySlugSchema, { slug });

  const category = await prisma.category.findUnique({
    where: { name: data.slug },
    select: {
      id: true,
      name: true,
      slug: true,
      products: {
        select: {
          id: true,
          title: true,
          price: true,
          images: true,
          color: true,
          storage: true,
          ram: true,
        },
      },
      created_at: true,
      updated_at: true,
    },
  });

  if (!category) {
    throw new NotFoundError('Category tidak ditemukan.');
  }

  return category;
};

const update = async (id, payload) => {
  const data = await validate(createCategorySchema, payload);

  await _checkCategoryExistence(id);
  await _checkDataExistence(data.name);

  const slug = generateSlug(data.name);

  const category = await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug,
    },
  });

  return category;
};

const destroy = async (id) => {
  const data = await validate(getCategoryByIdSchema, { id });

  await _checkCategoryExistence(id);

  await prisma.category.delete({
    where: { id: data.id },
  });

  return true;
};

const count = async () => {
  const totalData = await prisma.category.count();
  return totalData;
};

export default { create, findAll, findBySlug, count, update, destroy };
