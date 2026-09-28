import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralised access to environment variables.
 * Credentials are read from .env and are never hardcoded in tests.
 */
export const BASE_URL = process.env.SEP_QA_URL;
export const USERNAME = process.env.SEP_USERNAME;
export const PASSWORD = process.env.SEP_PASSWORD;
