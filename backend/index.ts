import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import http from 'http'
import {PORT, MONGODB_URI, SERVER_URL, API_VERSION} from './config/config'
import clientRoutes from './routes/clientRoutes'
import swaggerUI from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import loggerAdapter from "./logger/logger";
import {swaggerSpec} from "./swagger/swaggerSpec";
import corsMiddleware from "./middleware/cors/corsMiddleware";
import { helmetMiddleware } from "./middleware/security/helmetMiddleware";
import { compressionMiddleware } from "./middleware/security/compressionMiddleware";
import authRoutes from "./routes/authRoutes";
import databaseAdapter, { DatabaseAdapter } from './config/database';
class App {
    private static instance: App | null = null;
    private readonly expressApp: express.Application;
    private server: http.Server;
    private dbAdapter: DatabaseAdapter;

    private constructor() {
        this.expressApp = express();
        this.server = http.createServer(this.expressApp);
        this.dbAdapter = databaseAdapter;
        this.expressApp.use(corsMiddleware);
        this.expressApp.use(helmetMiddleware);
        this.expressApp.use(compressionMiddleware);
        this.expressApp.use(cookieParser());
        this.expressApp.use(session({ secret: process.env.SESSION_SECRET_KEY || '' }));
        this.expressApp.disable('x-powered-by');
        this.expressApp.use(express.json());
        this.expressApp.use(API_VERSION, authRoutes);
        this.expressApp.use(API_VERSION, clientRoutes);

        this.expressApp.use(
            '/api-docs/v1',
            swaggerUI.serve,
            swaggerUI.setup(swaggerJSdoc(swaggerSpec))
        );
    }

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    public async start(): Promise<void> {
        try {
            await this.dbAdapter.connect(); // Connect to the database using the adapter

            this.server.listen(PORT, () => {
                loggerAdapter.info(`Backend is running on ${SERVER_URL}`);
            });
        } catch (error) {
            loggerAdapter.error(`Error connecting to the database: ${error}`);
        }
    }
}

const appInstance = App.getInstance();
appInstance.start();

export default App;
