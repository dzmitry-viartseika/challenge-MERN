import {ResponseStatus} from "../ts/enums/ResponseStatus";

export class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors: any) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnAuthorizedError() {
        return new ApiError(ResponseStatus.UNAUTHORIZED, 'The User is not authorized', '')
    }

    static BadRequest(message: string, errors: any = []) {
        return new ApiError(ResponseStatus.BAD_REQUEST, message, errors)
    }


    static InternalRequestError(message: string, errors: any[]) {
        return new ApiError(ResponseStatus.INTERNAL_ERROR, message, errors)
    }
}