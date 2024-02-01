import * as Joi from 'joi';

export const validationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    POSTGRES_HOST: Joi.string(),
    POSTGRES_PORT: Joi.number(),
    POSTGRES_DATABASE: Joi.string(),
    POSTGRES_USERNAME: Joi.string(),
    POSTGRES_PASSWORD: Joi.string(),
    POSTGRES_CERT_PATH: Joi.string(),
    // MONGO_HOST: Joi.string().default('127.0.0.1'),
    // MONGO_PORT: Joi.number().port().default(27017),
    // MONGO_DATABASE: Joi.string().default('mongo'),
    // MONGO_USERNAME: Joi.string().allow('').default(''),
    // MONGO_PASSWORD: Joi.string().allow('').default(''),
    // JWT_SECRET: Joi.string(),
    // JWT_EXPIRE: Joi.number().default(1209600000), // 14d
    THROTTLE_TTL: Joi.number().default(60_000),
    THROTTLE_LIMIT: Joi.number().default(16),
    // FALLBACK_LANGUAGE: Joi.string().valid('en', 'uk', 'ru').default('en'),
});
