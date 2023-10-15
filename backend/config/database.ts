import mongoose from "mongoose";
import { MONGODB_URI } from "./config";
import loggerAdapter from "../logger/logger";
export abstract class DatabaseAdapter {
    abstract connect(): Promise<void>;
}

class MongoDBAdapter extends DatabaseAdapter {
    async connect(): Promise<void> {
        try {
            if (!MONGODB_URI) {
                throw new Error("MONGODB_URI is not defined");
            }
            await mongoose.connect(MONGODB_URI);
            loggerAdapter.info(`Connected to MongoDB URI=${MONGODB_URI}`);
        } catch (err) {
            loggerAdapter.error(`Error connecting to MongoDB URI=${MONGODB_URI}`);
        }
    }
}

const databaseAdapter: DatabaseAdapter = new MongoDBAdapter();

export default databaseAdapter;