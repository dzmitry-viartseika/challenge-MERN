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
import { swaggerSpec } from './swagger/swaggerSpec';
import corsMiddleware from './middleware/cors/corsMiddleware';
import { helmetMiddleware } from './middleware/security/helmetMiddleware';
import { compressionMiddleware } from './middleware/security/compressionMiddleware';
import authRoutes from './routes/authRoutes';
import databaseAdapter, { DatabaseAdapter } from './config/database';
import notFoundMiddleWare from "./middleware/notFound";
import errorHandlerMiddleWare from "./middleware/errorHandlerMiddleWare";
const GitHubStrategy = require('passport-github2').Strategy;
const MongoStore = require('connect-mongo')

const key = fs.readFileSync('./config/key.pem');
const cert = fs.readFileSync('./config/cert.pem');
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

        // Initialize Passport and Passport sessions after express-session
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());

        // GitHub Passport strategy configuration
        // passport.use(new GitHubStrategy({
        //     clientID: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
        //     callbackURL: 'http://localhost:4000/api/v1/auth/github/callback',
        // }, (accessToken: any, refreshToken: any, profile: any, done: any) => {
        //     return done(null, profile);
        // }));

        this.server = https.createServer({key: key, cert: cert }, this.expressApp);
        this.dbAdapter = databaseAdapter;
        this.expressApp.use(corsMiddleware);
        this.expressApp.use(helmetMiddleware);
        this.expressApp.use(compressionMiddleware);
        this.expressApp.use(cookieParser());
        this.expressApp.disable('x-powered-by');
        this.expressApp.use(express.json());
        this.expressApp.use(API_VERSION, authRoutes);
        this.expressApp.use(API_VERSION, clientRoutes);
        this.expressApp.use(notFoundMiddleWare);
        this.expressApp.use(errorHandlerMiddleWare);

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