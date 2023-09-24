import logger, { Logger } from 'pino';

const log: Logger = logger({
    base: {
        pid: false,
    },
});

export default log;