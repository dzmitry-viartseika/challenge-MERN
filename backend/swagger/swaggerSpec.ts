import { PORT } from '../config/config';

export const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend API',
            version: '1.0.0',
        },
        servers: [
            {
                url: `https://localhost:${PORT}`,
            }
        ]
    },
    apis: ['../routes/authRoutes'],
};