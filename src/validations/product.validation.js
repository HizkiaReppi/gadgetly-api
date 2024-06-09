import Joi from 'joi';

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Nama produk harus berupa teks',
    'string.min': 'Nama produk harus memiliki panjang minimal 3 karakter.',
    'string.max': 'Nama produk harus memiliki panjang maksimal 100 karakter.',
    'any.required': 'Nama produk wajib diisi',
  }),
  description: Joi.string().max(1000).allow(null, '').messages({
    'string.base': 'Deskripsi harus berupa teks',
    'string.max':
      'Deskripsi produk harus memiliki panjang maksimal 1000 karakter.',
  }),
  price: Joi.number().precision(2).required().messages({
    'number.base': 'Harga harus berupa angka',
    'any.required': 'Harga wajib diisi',
  }),
  condition: Joi.string()
    .valid('NEW', 'NORMAL', 'REFURBISHED')
    .required()
    .messages({
      'string.base': 'Kondisi harus berupa teks',
      'any.only': 'Kondisi harus salah satu dari [BARU, NORMAL, DIPERBAHARUI]',
      'any.required': 'Kondisi wajib diisi',
    }),
  color: Joi.string().max(50).required().messages({
    'string.base': 'Warna produk harus berupa teks',
    'string.max': 'Warna produk harus memiliki panjang maksimal 50 karakter.',
    'any.required': 'Warna produk wajib diisi',
  }),
  storage: Joi.string().max(20).required().messages({
    'string.base': 'Penyimpanan produk harus berupa teks',
    'string.max':
      'Penyimpanan produk harus memiliki panjang maksimal 20 karakter.',
    'any.required': 'Penyimpanan produk wajib diisi',
  }),
  ram: Joi.string().max(20).required().messages({
    'string.base': 'RAM produk harus berupa teks',
    'string.max': 'RAM produk harus memiliki panjang maksimal 20 karakter.',
    'any.required': 'RAM produk wajib diisi',
  }),
  images: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().optional(),
      originalname: Joi.string().optional(),
      mimetype: Joi.string()
        .valid('image/jpeg', 'image/jpg', 'image/png')
        .optional()
        .messages({
          'string.base': 'Tipe File foto tidak valid.',
          'any.only':
            'Hanya format File JPEG, JPG atau PNG yang diperbolehkan.',
        }),
      buffer: Joi.binary().optional(),
      encoding: Joi.string().optional(),
      size: Joi.number().integer().min(0).max(2097152).optional().messages({
        'number.min': 'Ukuran File maksimal 2mb.',
        'number.max': 'Ukuran File maksimal 2mb.',
      }),
    }),
  ),
  category_id: Joi.number().integer().required().messages({
    'number.base': 'ID Kategori harus berupa angka',
    'any.required': 'ID Kategori wajib diisi',
  }),
  user_id: Joi.string().required().messages({
    'number.base': 'ID Pengguna harus berupa text',
    'any.required': 'ID Pengguna wajib diisi',
  }),
});

export const getAllProductSchema = Joi.object({
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

export const getProductByIdSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Id wajib diisi.',
  }),
});

export const searchProductSchema = Joi.object({
  query: Joi.string().required().messages({
    'any.required': 'Id wajib diisi.',
  }),
});
