import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Name hanya boleh berisi huruf.',
      'any.required': 'Name wajib diisi.',
      'string.min': 'Name harus memiliki panjang minimal 3 karakter.',
      'string.max': 'Name harus memiliki panjang maksimal 100 karakter.',
    }),
  username: Joi.string()
    .min(3)
    .max(50)
    .alphanum()
    .pattern(/^(?=.*[a-zA-Z])[a-zA-Z][a-zA-Z\d]{2,}$/)
    .required()
    .messages({
      'any.required': 'Username wajib diisi.',
      'string.min': 'Username harus memiliki panjang minimal 3 karakter.',
      'string.max': 'Username harus memiliki panjang maksimal 50 karakter.',
      'string.alphanum':
        'Username hanya boleh berisi huruf dan angka tanpa spasi.',
      'string.pattern.base': 'Username harus diawali dengan huruf',
    }),
  email: Joi.string().email().max(255).required().messages({
    'any.required': 'Email wajib diisi.',
    'string.email': 'Email tidak valid.',
  }),
  password: Joi.string()
    .min(6)
    .max(255)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
    .required()
    .messages({
      'string.pattern.base':
        'Password harus mengandung setidaknya satu huruf kecil, satu huruf besar, satu angka.',
      'any.required': 'Password wajib diisi.',
      'string.min': 'Password harus memiliki panjang minimal 6 karakter.',
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Konfirmasi kata sandi harus sama dengan kata sandi.',
      'any.required': 'Konfirmasi kata sandi wajib diisi.',
    }),
  role: Joi.string().valid('USER', 'ADMIN').default('USER').messages({
    'any.only': 'Role tidak valid.',
  }),
});

export const getAllUserSchema = Joi.object({
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

export const getUserByEmailSchema = Joi.object({
  email: Joi.string().email().max(255).required().messages({
    'any.required': 'Email wajib diisi.',
    'string.email': 'Email tidak valid.',
  }),
});

export const getUserByUsernameSchema = Joi.object({
  username: Joi.string().min(3).max(50).alphanum().required().messages({
    'any.required': 'Username wajib diisi.',
    'string.min': 'Username harus memiliki panjang minimal 3 karakter.',
    'string.max': 'Username harus memiliki panjang maksimal 50 karakter.',
    'string.alphanum': 'Username hanya boleh berisi huruf dan angka.',
  }),
});

export const getUserByIdSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Id wajib diisi.',
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Name hanya boleh berisi huruf.',
      'any.required': 'Name wajib diisi.',
      'string.min': 'Name harus memiliki panjang minimal 3 karakter.',
      'string.max': 'Name harus memiliki panjang maksimal 100 karakter.',
    }),
  username: Joi.string()
    .min(3)
    .max(50)
    .alphanum()
    .pattern(/^(?=.*[a-zA-Z])[a-zA-Z][a-zA-Z\d]{2,}$/)
    .required()
    .messages({
      'any.required': 'Username wajib diisi.',
      'string.min': 'Username harus memiliki panjang minimal 3 karakter.',
      'string.max': 'Username harus memiliki panjang maksimal 50 karakter.',
      'string.alphanum':
        'Username hanya boleh berisi huruf dan angka tanpa spasi.',
      'string.pattern.base': 'Username harus diawali dengan huruf',
    }),
  email: Joi.string().email().max(255).required().messages({
    'any.required': 'Email wajib diisi.',
    'string.email': 'Email tidak valid.',
  }),
});

export const updateUserPasswordSchema = Joi.object({
  old_password: Joi.string()
    .min(6)
    .max(255)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
    .required()
    .messages({
      'any.required': 'Kata sandi lama wajib diisi.',
      'string.pattern.base':
        'Kata sandi lama harus mengandung setidaknya satu huruf kecil, satu huruf besar, satu angka.',
      'string.min':
        'Kata sandi lama harus memiliki panjang minimal 6 karakter.',
    }),
  password: Joi.string()
    .min(6)
    .max(255)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)
    .required()
    .messages({
      'any.required': 'Kata sandi baru wajib diisi.',
      'string.pattern.base':
        'Kata sandi baru harus mengandung setidaknya satu huruf kecil, satu huruf besar, satu angka.',
      'string.min':
        'Kata sandi baru harus memiliki panjang minimal 6 karakter.',
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Konfirmasi kata sandi harus sama dengan kata sandi baru.',
      'any.required': 'Konfirmasi kata sandi wajib diisi.',
    }),
});
