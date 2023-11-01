import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import http from 'http';
import passport from 'passport';
import mongoose from 'mongoose';
import { PORT, SERVER_URL, API_VERSION, COOKIE_KEY } from './config/config';
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
const GitHubStrategy = require('passport-github2').Strategy;
const MongoStore = require('connect-mongo')

class App {
    private static instance: App | null = null;
    private readonly expressApp: express.Application;
    private server: http.Server;
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
        passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/api/v1/auth/github/callback',
        }, (accessToken: any, refreshToken: any, profile: any, done: any) => {
            console.log('profile', profile)
            return done(null, profile);
        }));

        this.server = http.createServer(this.expressApp);
        this.dbAdapter = databaseAdapter;
        this.expressApp.use(corsMiddleware);
        this.expressApp.use(helmetMiddleware);
        this.expressApp.use(compressionMiddleware);
        this.expressApp.use(cookieParser());
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