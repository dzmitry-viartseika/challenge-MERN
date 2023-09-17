import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import { PORT, MONGODB_URI, SERVER_URL } from './config/config'
import userRoutes from './routes/clientRoutes'
import cors from 'cors'
const app = express()
const server = http.createServer(app)

const whitelist = ['http://localhost:3001']
const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use('/api', userRoutes)

const startApp = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        server.listen(PORT, () => {
            console.log(`Backend is running on the ${SERVER_URL}`)
            console.log(`Mongodb is running on the ${MONGODB_URI}`)
        })
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

startApp()

export default app
