/* eslint-disable no-param-reassign */
import {
  createProductSchema,
  getAllProductSchema,
  getProductByIdSchema,
  searchProductSchema,
} from '../validations/product.validation.js';
import validate from '../utils/validation.js';
import prisma from '../utils/database.js';
import { writeFile, createPreSignedUrl } from './storage.service.js';

const create = async (payload) => {
  const data = await validate(createProductSchema, payload);

  let images;

  if (data.images) {
    const result = await writeFile(data.images);

    images = result;
  }

  const product = await prisma.product.create({
    data: {
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      price: data.price,
      condition: data.condition,
      brand: data.brand,
      model: data.model,
      specifications: {
        create: data.specifications.map((specification) => ({
          name: specification.name,
          value: specification.value,
        })),
      },
      images: {
        create: images.map((image) => ({
          image_url: image.key,
        })),
      },
    },
    select: {
      id: true,
      category_id: true,
      title: true,
      price: true,
      condition: true,
      brand: true,
      model: true,
      specifications: {
        select: {
          name: true,
          value: true,
        },
      },
      images: {
        select: {
          image_url: true,
        },
      },
    },
  });

  return product;
};

const findAll = async (limit, page) => {
  const data = await validate(getAllProductSchema, { limit, page });
  const skip = (data.page - 1) * data.limit;
  const product = await prisma.product.findMany({
    skip,
    take: data.limit,
    orderBy: { title: 'asc' },
    select: {
      id: true,
      category_id: true,
      title: true,
      price: true,
      condition: true,
      model: true,
      images: true,
      created_at: true,
    },
  });

  const imagePromises = product.map((item) =>
    Promise.all(
      item.images.map(async (image) => {
        const photo = await createPreSignedUrl(image.image_url);
        return { ...image, image_url: photo };
      }),
    ),
  );

  const images = await Promise.all(imagePromises);

  return product.map((item, index) => {
    item.images = images[index].map((image) => ({
      image_url: image.image_url,
    }));
    return item;
  });
};

const findById = async (id) => {
  await validate(getProductByIdSchema, { id });

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      category_id: true,
      title: true,
      description: true,
      price: true,
      condition: true,
      model: true,
      specifications: {
        select: {
          name: true,
          value: true,
        },
      },
      images: {
        select: {
          image_url: true,
        },
      },
    },
  });

  if (product && product.images) {
    const imagePromises = product.images.map(async (image) => {
      const photo = await createPreSignedUrl(image.image_url);
      return { ...image, image_url: photo };
    });

    product.images = await Promise.all(imagePromises);
  }

  return product;
};

const searchProducts = async (query) => {
  await validate(searchProductSchema, { query });

  return prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
};

const count = async () => {
  const totalData = await prisma.product.count();
  return totalData;
};

export default { create, findAll, findById, searchProducts, count };
