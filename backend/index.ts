import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import https from 'https';
import fs from 'fs';
import passport from 'passport';
import { PORT, SERVER_URL, API_VERSION } from './config/config';
import clientRoutes from './routes/clientRoutes';
import swaggerUI from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import loggerAdapter from './logger/logger';
import options from './swagger/swaggerSpec';
import corsMiddleware from './middleware/cors/corsMiddleware';
import { helmetMiddleware } from './middleware/security/helmetMiddleware';
import { compressionMiddleware } from './middleware/security/compressionMiddleware';
import authRoutes from './routes/authRoutes';
import databaseAdapter, { DatabaseAdapter } from './config/database';
import notFoundMiddleWare from "./middleware/notFound";
import passportRoutes from "./routes/passportRoutes";
import errorMiddleWare from "./middleware/errorMiddleWare";
const MongoStore = require('connect-mongo');

const key = fs.readFileSync('./config/key.pem');
const cert = fs.readFileSync('./config/cert.pem');

const specs = swaggerJSdoc(options);

class App {
    private static instance: App | null = null;
    private readonly expressApp: express.Application;
    private server: https.Server;
    private dbAdapter: DatabaseAdapter;

    private constructor() {
        this.expressApp = express();

        this.expressApp.use(
            session({
                secret: 'sessionKey',
                resave: true,
                saveUninitialized: false,
                store: new MongoStore({
                    mongoUrl: process.env.MONGODB_URL,
                })
            })
        );

        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());

        this.server = https.createServer({key: key, cert: cert }, this.expressApp);
        this.dbAdapter = databaseAdapter;
        this.expressApp.use(corsMiddleware);
        this.expressApp.use(helmetMiddleware);
        this.expressApp.use(compressionMiddleware);
        this.expressApp.use(cookieParser());
        this.expressApp.disable('x-powered-by');
        this.expressApp.use(express.json());
        this.expressApp.use(API_VERSION, authRoutes);
        this.expressApp.use(API_VERSION, passportRoutes);
        this.expressApp.use(API_VERSION, clientRoutes);
        this.expressApp.use(
            "/api-docs",
            swaggerUI.serve,
            swaggerUI.setup(specs)
        );
        // this.expressApp.use('/api-docs',  swaggerUI.serve, swaggerUI.setup(swaggerFile))
        this.expressApp.use(notFoundMiddleWare);
        this.expressApp.use(errorMiddleWare);
    }

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    public async start(): Promise<void> {
        try {
            await this.dbAdapter.connect();

            this.server.listen(PORT, () => {
                loggerAdapter.info(`Backend is running on ${SERVER_URL}`);
            });
        } catch (error: unknown) {
            loggerAdapter.error(`Error connecting to the database: ${error}`);
        }
    }
}

const appInstance = App.getInstance();
appInstance.start();

export default App;