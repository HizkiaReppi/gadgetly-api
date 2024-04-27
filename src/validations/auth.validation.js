import Joi from 'joi';

export const loginSchema = Joi.object({
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
});
