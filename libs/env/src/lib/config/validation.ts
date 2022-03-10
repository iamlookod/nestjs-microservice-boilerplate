import * as Joi from 'joi';

export const validationSchema = Joi.object({
  isProduction: Joi.boolean().default(false),
  appEnv: Joi.string().valid('development', 'production', 'staging'),
  port: Joi.number().allow(null),
  mongodbURI: Joi.string(),
  redisHost: Joi.string(),
  redisPort: Joi.number().default(6379),
  kafkaURL: Joi.string(),
  kafkaApiKey: Joi.string(),
  kafkaApiSecret: Joi.string(),
});
