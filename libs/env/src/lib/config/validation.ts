import * as Joi from 'joi';

export const validationSchema = Joi.object({
  isProduction: Joi.boolean().default(false),
  appEnv: Joi.string().valid('development', 'production', 'staging'),
  port: Joi.number().allow(null),
  redisHost: Joi.string().required(),
  redisPort: Joi.number().default(6379),
});
