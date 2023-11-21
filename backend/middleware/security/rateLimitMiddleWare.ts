import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'Too many requests from this IP address, please try again after 15 minutes!'
})