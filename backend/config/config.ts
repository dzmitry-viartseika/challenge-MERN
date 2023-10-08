require('dotenv').config()
export const PORT = parseInt(process.env.PORT as string, 10) || 3001
export const HOST = process.env.HOST ?? 'localhost'

export const SERVER_URL = `http://${HOST}:${PORT}`

export const MONGODB_URI = process.env.MONGODB_URL

export const ALLOWED_BASE_URLS = ['http://localhost:3000', 'http://localhost:4000']

export const API_VERSION = '/api/v1'

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';

export default {
    PORT,
    HOST,
    SERVER_URL,
    MONGODB_URI,
    API_VERSION,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
}
