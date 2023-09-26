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
const whitelist = ['http://localhost:3000', 'http://localhost:4000']
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

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);
        if(whitelist.indexOf(origin) === -1){
            const message = 'The CORS policy for this site does not allow access from the specified Origin';
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json())
app.use('/api/v1', userRoutes)
//http://localhost:4000/api-docs/v1/
app.use(
    '/api-docs/v1',
    swaggerUI.serve,
    swaggerUI.setup(swaggerJSdoc(swaggerSpec), {})
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
