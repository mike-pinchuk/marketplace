import { config } from 'dotenv';
import * as Joi from 'joi';

const requiredEnvs = {
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required()
};

const secretCodeEnv = {
    JWT_ACCESS_KEY: Joi.string().required(),
    JWT_REFRESH_KEY: Joi.string().required(),
}

const optionsEnvs = {
    NODE_ENV: Joi.string()
        .valid('local', 'development', 'production', 'string')
        .default('development'),
    PORT: Joi.number().port().default(3000),
    LOGS_DIR_NAME: Joi.string().default('./logs/')
};

const envs = {
    ...requiredEnvs,
    ...optionsEnvs,
    ...secretCodeEnv,
};

const validateAndReturnTypedEnv = () => {
    config();
    const keys = Object.keys(envs);
    const globalEnvs: { [key: string]: any } = {};
    keys.forEach((key) => {
        globalEnvs[key] = process.env[key];
    });
    const { error, value } = Joi.object(requiredEnvs).concat(Joi.object(optionsEnvs)).concat(Joi.object(secretCodeEnv))
        .validate(globalEnvs, { allowUnknown: false, abortEarly: true });
    if (error) {
        throw new Error(error.message);
    }
    return value as { [key in keyof typeof envs]: any };
};

export const typedEnv = validateAndReturnTypedEnv();