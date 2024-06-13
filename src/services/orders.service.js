/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import prisma from '../utils/database.js';
import validate from '../utils/validation.js';
import { createPreSignedUrl } from './storage.service.js';
import {
  createOrderSchema,
  getOrderByIdSchema,
  getOrdersByUserSchema,
  getOrdersBySellerSchema,
} from '../validations/orders.validation.js';

const create = async (payload) => {
  const data = await validate(createOrderSchema, payload);

  const order = await prisma.order.create({
    data: {
      user_id: data.user_id,
      total_price: data.total_price,
      items: {
        create: data.products.map((productId) => ({
          product_id: productId,
        })),
      },
      detail: {
        create: {
          fullname: data.orderDetail.fullname,
          phone: data.orderDetail.phone,
          whatsapp: data.orderDetail.whatsapp,
          address: data.orderDetail.address,
          email: data.orderDetail.email,
          payment_method: data.orderDetail.payment_method,
          shipping_method: data.orderDetail.shipping_method,
        },
      },
    },
  });

  return order;
};

const findAll = async (limit, page) => {
  const orders = await prisma.order.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                take: 1,
              },
            },
          },
        },
      },
      detail: true,
      delivery: true,
    },
  });

  for (const order of orders) {
    for (const item of order.items) {
      if (item.product.images.length > 0) {
        item.product.image_url = await createPreSignedUrl(
          item.product.images[0].image_url,
        );
        delete item.product.images;
      }
    }
  }

  return orders;
};

const findById = async (id) => {
  const data = await validate(getOrderByIdSchema, { id });

  const order = await prisma.order.findUnique({
    where: {
      id: data.id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                take: 1,
              },
            },
          },
        },
      },
      detail: true,
      delivery: true,
    },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  for (const item of order.items) {
    if (item.product.images.length > 0) {
      item.product.image_url = await createPreSignedUrl(
        item.product.images[0].image_url,
      );
      delete item.product.images;
    }
  }

  return order;
};

const findByIds = async (ids) => {
  const orders = await prisma.order.findMany({
    where: {
      id: { in: ids },
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                take: 1,
              },
            },
          },
        },
      },
      detail: true,
      delivery: true,
    },
  });

  for (const order of orders) {
    for (const item of order.items) {
      if (item.product.images.length > 0) {
        item.product.image_url = await createPreSignedUrl(
          item.product.images[0].image_url,
        );
        delete item.product.images;
      }
    }
  }

  return orders;
};

const findByUserId = async (userId) => {
  const data = await validate(getOrdersByUserSchema, { user_id: userId });

  const orders = await prisma.order.findMany({
    where: {
      user_id: data.user_id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                take: 1,
              },
            },
          },
        },
      },
      detail: true,
      delivery: true,
    },
  });

  for (const order of orders) {
    for (const item of order.items) {
      if (item.product.images.length > 0) {
        item.product.image_url = await createPreSignedUrl(
          item.product.images[0].image_url,
        );
        delete item.product.images;
      }
    }
  }

  return orders;
};

const findBySellerId = async (sellerId) => {
  const data = await validate(getOrdersBySellerSchema, { seller_id: sellerId });

  const orders = await prisma.order.findMany({
    where: {
      seller_id: data.seller_id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                take: 1,
              },
            },
          },
        },
      },
      detail: true,
      delivery: true,
    },
  });

  for (const order of orders) {
    for (const item of order.items) {
      if (item.product.images.length > 0) {
        item.product.image_url = await createPreSignedUrl(
          item.product.images[0].image_url,
        );
        delete item.product.images;
      }
    }
  }

  return orders;
};

const count = async () => {
  const totalData = await prisma.order.count();
  return totalData;
};

export default {
  create,
  findAll,
  findById,
  findByIds,
  findByUserId,
  findBySellerId,
  count,
};
