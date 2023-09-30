import express from 'express'
import mongoose from 'mongoose'
import compression from 'compression'
import helmet from 'helmet'
import http from 'http'
import { PORT, MONGODB_URI, SERVER_URL, ALLOWED_BASE_URLS } from './config/config'
import userRoutes from './routes/clientRoutes'
import swaggerUI from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import cors from 'cors'
import winston, { format, createLogger, transports } from 'winston';
const app = express()
const server = http.createServer(app)
const { combine, timestamp, label, prettyPrint } = format;
const CATEGORY = "winston custom format";
const logger = winston.createLogger({
    level: "debug",
    format: combine(
        label({ label: CATEGORY }),
        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        prettyPrint(),
    ),
    transports: [new transports.Console()],
});

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
        if(ALLOWED_BASE_URLS.indexOf(origin) === -1){
            const message = 'The CORS policy for this site does not allow access from the specified Origin';
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));
app.use(compression())
app.use(helmet())
app.disable('x-powered-by')
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
            logger.info(`Backend is running on the ${SERVER_URL}`);
            logger.info(`Mongodb is running on the ${MONGODB_URI}`);
        })
    } catch (error) {
        logger.error(`'Error connecting to MongoDB:', ${error}`)
    }
}

startApp();

export default app
