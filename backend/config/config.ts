require('dotenv').config()
export const PORT = parseInt(process.env.PORT as string, 10) || 3001
export const HOST = process.env.HOST ?? 'localhost'

export const SERVER_URL = `https://${HOST}:${PORT}`

export const MONGODB_URI = process.env.MONGODB_URL

export const CACHE_TIME = 10;
export const ALLOWED_BASE_URLS = ['http://localhost:3000', 'http://localhost:4000', 'https://localhost:3000', 'https://localhost:4000']

export const API_VERSION = '/api/v1';
export const COOKIE_KEY = process.env.COOKIE_KEY || '';

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';

export const JWT_ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m'
export const JWT_REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '30d'

export const SUCCESS_REDIRECT = `https://localhost:3000/dashboard`;
export const FAILURE_REDIRECT = `https://localhost:3000/login`;

export const BAD_REQUEST_PAGE = process.env.CLIENT_ERROR_PAGE_URL || '';
export default {
    PORT,
    HOST,
    SERVER_URL,
    MONGODB_URI,
    API_VERSION,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
    CACHE_TIME,
    BAD_REQUEST_PAGE,
}
