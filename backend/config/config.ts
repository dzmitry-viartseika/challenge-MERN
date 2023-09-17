require('dotenv').config()
export const PORT = parseInt(process.env.PORT as string, 10) || 3001
export const HOST = process.env.HOST ?? 'localhost'

export const SERVER_URL = `http://${HOST}:${PORT}`

export const MONGODB_URI = process.env.MONGODB_URL

export const DATABASE_NAME = process.env.DATABASE_NAME ?? 'LearFull'

export default {
    PORT,
    HOST,
    SERVER_URL,
    MONGODB_URI,
}
