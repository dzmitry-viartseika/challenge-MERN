import ExpressRedisCache from 'express-redis-cache';
import {CACHE_TIME} from "./config";

const cache = ExpressRedisCache({
    expire: CACHE_TIME,
})

export default cache;