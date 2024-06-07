import Joi from 'joi';

export const createSellerSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'any.required': 'Id user wajib diisi.',
  }),
  domicile: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Domisili hanya boleh berisi huruf dan angka.',
      'any.required': 'Domisili wajib diisi.',
      'string.min': 'Domisili harus memiliki panjang minimal 3 karakter.',
      'string.max': 'Domisili harus memiliki panjang maksimal 50 karakter.',
    }),
  address: Joi.string().min(3).max(255).required().messages({
    'any.required': 'Alamat wajib diisi.',
    'string.min': 'Alamat harus memiliki panjang minimal 3 karakter.',
    'string.max': 'Alamat harus memiliki panjang maksimal 255 karakter.',
  }),
  phone: Joi.string().min(10).max(15).required().messages({
    'any.required': 'Nomor telepon wajib diisi.',
    'string.min': 'Nomor telepon harus memiliki panjang minimal 10 karakter.',
    'string.max': 'Nomor telepon harus memiliki panjang maksimal 15 karakter.',
  }),
});

export const getAllSellerSchema = Joi.object({
  limit: Joi.number().integer().min(1).required().messages({
    'any.required': 'Limit wajib diisi.',
    'number.min': 'Limit harus memiliki panjang minimal 1.',
    'number.integer': 'Limit harus berupa angka.',
  }),
  page: Joi.number().integer().min(1).required().messages({
    'any.required': 'Page wajib diisi.',
    'number.min': 'Page harus memiliki panjang minimal 1.',
    'number.integer': 'Page harus berupa angka.',
  }),
});

export const getSellerByIdSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Id wajib diisi.',
  }),
});

export const updateSellerSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'any.required': 'Id user wajib diisi.',
  }),
  domicile: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Domisili hanya boleh berisi huruf dan angka.',
      'any.required': 'Domisili wajib diisi.',
      'string.min': 'Domisili harus memiliki panjang minimal 3 karakter.',
      'string.max': 'Domisili harus memiliki panjang maksimal 50 karakter.',
    }),
  address: Joi.string().min(3).max(255).required().messages({
    'any.required': 'Alamat wajib diisi.',
    'string.min': 'Alamat harus memiliki panjang minimal 3 karakter.',
    'string.max': 'Alamat harus memiliki panjang maksimal 255 karakter.',
  }),
  phone: Joi.string().min(10).max(15).required().messages({
    'any.required': 'Nomor telepon wajib diisi.',
    'string.min': 'Nomor telepon harus memiliki panjang minimal 10 karakter.',
    'string.max': 'Nomor telepon harus memiliki panjang maksimal 15 karakter.',
  }),
});
