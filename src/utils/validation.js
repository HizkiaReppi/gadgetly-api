import Joi from 'joi';

const { ValidationError } = Joi;

const validate = async (schema, payload) => {
  const { error, value } = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    throw new ValidationError('Validation failed', error.details);
  }
  return value;
};

export default validate;
