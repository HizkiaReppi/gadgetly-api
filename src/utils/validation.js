import Joi from 'joi';

const { ValidationError } = Joi;

/**
 *
 * @param {Object} schema Schema to validate
 * @param {Object} payload Payload to validate
 * @return {Promise<Object>}
 */
const validate = async (schema, payload) => {
  const { error, value } = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    throw new ValidationError('Validasi gagal', error.details);
  }
  return value;
};

export default validate;
