import {
  createProductSchema,
  getAllProductSchema,
  getProductByIdSchema,
  searchProductSchema,
  getProductByIdsSchema,
} from '../validations/product.validation.js';
import validate from '../utils/validation.js';
import prisma from '../utils/database.js';
import { writeFile, createPreSignedUrl } from './storage.service.js';
import NotFoundError from '../errors/NotFoundError.js';

const _checkCategoryExist = async (id) => {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!category) throw new NotFoundError('Category tidak ditemukan');
};

const _checkSeller = async (userId) => {
  const seller = await prisma.seller.findUnique({
    where: {
      user_id: userId,
    },
  });

  if (!seller) {
    throw new NotFoundError('Pengguna belum terdaftar sebagai Penjual');
  }

  return seller;
};

const create = async (payload) => {
  const data = await validate(createProductSchema, payload);
  const seller = await _checkSeller(data.user_id);
  await _checkCategoryExist(data.category_id);

  let images;
  if (data.images) {
    const result = await writeFile(data.images);

    images = result;
  }

  const product = await prisma.product.create({
    data: {
      category_id: data.category_id,
      title: data.title,
      seller_id: seller.id,
      description: data?.description,
      price: data.price,
      condition: data.condition,
      color: data.color,
      storage: data.storage,
      ram: data.ram,
      images: {
        create: images.map((image) => ({
          image_url: image.key,
        })),
      },
    },
  });

  return product;
};

const findAll = async (limit, page, sort) => {
  const data = await validate(getAllProductSchema, { limit, page, sort });

  const products = await prisma.product.findMany({
    skip: (data.page - 1) * data.limit,
    take: data.limit,
    orderBy:
      data.sort === 'latest'
        ? {
            created_at: 'desc',
          }
        : {
            title: 'asc',
          },
    select: {
      id: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      seller: {
        select: {
          domicile: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      title: true,
      price: true,
      color: true,
      storage: true,
      images: {
        select: { image_url: true },
        take: 1,
      },
      created_at: true,
      updated_at: true,
    },
  });

  const imagePromises = products.map(async (product) => {
    const imageUrl = product.images[0].image_url;
    const preSignedUrl = await createPreSignedUrl(imageUrl);
    return { ...product, images: preSignedUrl };
  });

  return Promise.all(imagePromises);
};

const findById = async (id) => {
  await validate(getProductByIdSchema, { id });

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      seller: {
        select: {
          id: true,
          domicile: true,
          address: true,
          phone: true,
          user: {
            select: {
              name: true,
              photo: true,
              last_login: true,
            },
          },
          Product: {
            include: {
              images: {
                select: {
                  image_url: true,
                },
                take: 1,
              },
            },
          },
        },
      },
      images: {
        select: {
          image_url: true,
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  const createPreSignedUrls = async (images) => {
    const imagePromises = images.map(async (image) => {
      const photo = await createPreSignedUrl(image.image_url);
      return { ...image, image_url: photo };
    });
    return Promise.all(imagePromises);
  };

  product.images = await createPreSignedUrls(product.images);

  if (product.seller && product.seller.Product) {
    for (const prod of product.seller.Product) {
      prod.images = await createPreSignedUrls(prod.images);
    }
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

const findByIds = async (ids) => {
  const data = await validate(getProductByIdsSchema, ids);
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: data.ids,
      },
    },
    select: {
      id: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      seller: {
        select: {
          domicile: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      title: true,
      price: true,
      color: true,
      storage: true,
      ram: true,
      condition: true,
      description: true,
      images: {
        select: { image_url: true },
        take: 1,
      },
      created_at: true,
      updated_at: true,
    },
  });

  const imagePromises = products.map(async (product) => {
    const imageUrl = product.images[0]?.image_url;
    const preSignedUrl = imageUrl ? await createPreSignedUrl(imageUrl) : null;
    return { ...product, images: preSignedUrl };
  });

  return Promise.all(imagePromises);
};

const count = async () => {
  const totalData = await prisma.product.count();
  return totalData;
};

export default {
  create,
  findAll,
  findById,
  searchProducts,
  count,
  findByIds,
};
