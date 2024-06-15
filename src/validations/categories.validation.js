import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Name hanya boleh berisi huruf.',
      'any.required': 'Name wajib diisi.',
      'string.min': 'Name harus memiliki panjang minimal 2 karakter.',
      'string.max': 'Name harus memiliki panjang maksimal 100 karakter.',
    }),
});

export const getAllCategorySchema = Joi.object({
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

export const getCategoryBySlugSchema = Joi.object({
  slug: Joi.string().required().messages({
    'any.required': 'Id wajib diisi.',
  }),
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

export const getCategoryByIdSchema = Joi.object({
  id: Joi.number().required().messages({
    'any.required': 'Id wajib diisi.',
  }),
});
