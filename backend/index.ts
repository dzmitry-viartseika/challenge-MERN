import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import { PORT, MONGODB_URI, SERVER_URL } from './config/config'
import userRoutes from './routes/clientRoutes'
import swaggerUI from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import cors from 'cors'
const app = express()
import morgan from 'morgan'
const server = http.createServer(app)
const logger = morgan('combined')
const whitelist = ['http://localhost:3000']
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
app.use(morgan('dev'));

const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend API',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            }
        ]
    },
    apis: ['./routes/*.ts'],
}

app.use(cors(corsOptions))

app.use(express.json())
app.use('/api/v1', userRoutes)

app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerJSdoc(swaggerSpec))
)

const startApp = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        server.listen(PORT, () => {
            console.log(`Backend is running on the ${SERVER_URL}`);
            console.log(`Mongodb is running on the ${MONGODB_URI}`);
        })
    } catch (error) {
        console.log(`'Error connecting to MongoDB:', ${error}`)
    }
}

startApp();

export default app
