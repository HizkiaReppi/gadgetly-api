import Joi from 'joi';

export const createProductSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Judul harus berupa teks',
    'any.required': 'Judul wajib diisi',
  }),
  description: Joi.string().allow(null, ''),
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
  brand: Joi.string().allow(null, ''),
  model: Joi.string().allow(null, ''),
  specifications: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          'string.base': 'Kunci Spesifikasi harus berupa teks',
          'any.required': 'Kunci Spesifikasi wajib diisi',
        }),
        value: Joi.string().required().messages({
          'string.base': 'Nilai Spesifikasi harus berupa teks',
          'any.required': 'Nilai Spesifikasi wajib diisi',
        }),
      }),
    )
    .required()
    .messages({
      'array.base': 'Spesifikasi harus berupa array',
      'any.required': 'Spesifikasi wajib diisi',
    }),
  images: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().optional(),
      originalname: Joi.string().optional(),
      mimetype: Joi.string()
        .valid('image/jpeg', 'image/jpg', 'image/png')
        .optional()
        .messages({
          'string.base': 'Tipe file foto tidak valid.',
          'any.only': 'Hanya format JPEG, JPG atau PNG yang diperbolehkan.',
        }),
      buffer: Joi.binary().optional(),
      encoding: Joi.string().optional(),
      size: Joi.number().integer().min(0).max(2097152).optional().messages({
        'number.min': 'Ukuran file maksimal 2mb.',
        'number.max': 'Ukuran file maksimal 2mb.',
      }),
    }),
  ),
  category_id: Joi.number().integer().required().messages({
    'number.base': 'ID Kategori harus berupa angka',
    'any.required': 'ID Kategori wajib diisi',
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
