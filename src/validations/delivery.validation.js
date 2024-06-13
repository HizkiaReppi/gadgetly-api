import Joi from 'joi';

export const createOrderSchema = Joi.object({
  user_id: Joi.string().required(),
  seller_id: Joi.string().required(),
  total_price: Joi.number().precision(2).required(),
  products: Joi.array().items(Joi.string().required()).required(),
  orderDetail: Joi.object({
    fullname: Joi.string().max(100).required(),
    phone: Joi.string().max(15).required(),
    whatsapp: Joi.string().max(15).required(),
    address: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    payment_method: Joi.string().max(255).required(),
    shipping_method: Joi.string().max(255).required(),
  }).required(),
});

export const getOrderByIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const getOrdersByUserSchema = Joi.object({
  user_id: Joi.string().required(),
});

export const getOrdersBySellerSchema = Joi.object({
  seller_id: Joi.string().required(),
});
