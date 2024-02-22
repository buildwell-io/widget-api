import Joi from 'joi';

export const validationSchema = Joi.object({
    PORT: Joi.number(),
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    POSTGRES_HOST: Joi.string(),
    POSTGRES_PORT: Joi.number(),
    POSTGRES_DATABASE: Joi.string(),
    POSTGRES_USERNAME: Joi.string(),
    POSTGRES_PASSWORD: Joi.string(),
    POSTGRES_CERT_PATH: Joi.string().optional(),
    MONGO_URL: Joi.string(),
    MONGO_DATABASE: Joi.string(),
    JWT_ACCESS_SECRET: Joi.string(),
    JWT_ACCESS_EXPIRE: Joi.string(),
    JWT_REFRESH_SECRET: Joi.string(),
    JWT_REFRESH_EXPIRE: Joi.string(),
    THROTTLE_TTL: Joi.number(),
    THROTTLE_LIMIT: Joi.number(),
    SENDGRID_API_KEY: Joi.string(),
    STRIPE_API_KEY: Joi.string(),
    // FALLBACK_LANGUAGE: Joi.string().valid('en', 'uk', 'ru').default('en'),
});
