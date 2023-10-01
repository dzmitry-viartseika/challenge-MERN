import cors from 'cors';
import {ALLOWED_BASE_URLS} from "../../config/config";

const corsOptions = {
    credentials: true,
    origin: (origin: any, callback: any) => {
        if (!origin) return callback(null, true);
        if (ALLOWED_BASE_URLS.indexOf(origin) === -1) {
            const message = 'The CORS policy for this site does not allow access from the specified Origin';
            return callback(new Error(message), false);
        }
        return callback(null, true);
    },
};

export default cors(corsOptions)