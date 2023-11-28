export class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors: any) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnAuthorizedError() {
        return new ApiError(401, 'The User is not authorized', '')
    }

    static BadRequest(message: string, errors: any) {
        return new ApiError(400, message, errors)
    }

}