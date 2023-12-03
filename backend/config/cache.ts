import ExpressRedisCache from 'express-redis-cache';

const cache = ExpressRedisCache({
    expire: 10,
})

export default cache;