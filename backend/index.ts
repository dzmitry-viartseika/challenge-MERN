import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import {PORT, MONGODB_URI, SERVER_URL, API_VERSION} from './config/config'
import clientRoutes from './routes/clientRoutes'
import swaggerUI from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import {logger} from "./logger/logger";
import {connectToMongoDB} from "./database/database";
import {swaggerSpec} from "./swagger/swaggerSpec";
import corsMiddleware from "./middleware/cors/corsMiddleware";
import { helmetMiddleware } from "./middleware/security/helmetMiddleware";
import { compressionMiddleware } from "./middleware/security/compressionMiddleware";
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const server = http.createServer(app)

app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(compressionMiddleware);


app.disable('x-powered-by')
app.use(express.json())
app.use(API_VERSION, clientRoutes)

app.use(
    '/api-docs/v1',
    swaggerUI.serve,
    swaggerUI.setup(swaggerJSdoc(swaggerSpec))
)

const startApp = async () => {
    try {
        await connectToMongoDB();
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
