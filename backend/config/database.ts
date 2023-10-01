import mongoose from "mongoose";
import {MONGODB_URI} from "./config";
import {logger} from "../logger/logger";


export const connectToMongoDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }
        await mongoose.connect(MONGODB_URI);
        logger.info(`Connected to MongoDB ${MONGODB_URI}`);
    } catch (err) {
        logger.error(`Error connecting to MongoDB`);
    }
};