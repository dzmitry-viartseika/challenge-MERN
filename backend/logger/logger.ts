import winston, {format, transports} from "winston";

const { combine, timestamp, label, prettyPrint } = format;
const CUSTOM_LABEL_FORMAT = "winston logger custom format";
const FORMAT_TIME_STAMP = 'MMM-DD-YYYY HH:mm:ss'
export const logger = winston.createLogger({
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