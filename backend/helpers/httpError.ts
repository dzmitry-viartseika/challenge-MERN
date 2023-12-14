class HttpError extends Error {
    status: number;
    errorCode: string;
    errorMessage: string;
    exception: string;
    timestamp: string;

    constructor(message: string, status: number, errorCode: string, errorMessage: string, exception: string, timestamp: Date) {
        super(message);
        this.message = message;
        this.status = status;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.exception = exception;
        this.timestamp = timestamp.toISOString();
    }
}

export default HttpError;