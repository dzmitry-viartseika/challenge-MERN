import winston, {format, transports} from "winston";
const { combine, timestamp, label, prettyPrint } = format;
const CUSTOM_LABEL_FORMAT = "winston logger custom format";
const FORMAT_TIME_STAMP = 'MMM-DD-YYYY HH:mm:ss'
abstract class LoggerAdapter {
    abstract info(message: string): void;
    abstract warn(message: string): void;
    abstract error(message: string): void;
}
class WinstonLoggerAdapter extends LoggerAdapter {
    private logger: winston.Logger;

    constructor() {
        super();
        this.logger = winston.createLogger({
            level: "debug",
            format: combine(
                label({ label: CUSTOM_LABEL_FORMAT }),
                timestamp({
                    format: FORMAT_TIME_STAMP,
                }),
                prettyPrint(),
            ),
            transports: [new transports.Console()],
        });
    }

    info(message: string): void {
        this.logger.info(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }
}

const loggerAdapter: LoggerAdapter = new WinstonLoggerAdapter();

export default loggerAdapter;
