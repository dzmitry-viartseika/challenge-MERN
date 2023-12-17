import {NextFunction, Request} from "express";
import {ApiError} from "../../exceptions/apiError";
import tokenService from "../../services/tokenService";

export const authenticateToken = (req: Request, next: NextFunction) => {
    try {
        const header = req.header('Authorization');
        const token =  header && header.split(' ')[1];
        if (!token) {
            return next(ApiError.UnAuthorizedError())
        }

        const userData = tokenService.validateAccessToken(token);

        if (!userData) {
            return next(ApiError.UnAuthorizedError())
        }

        req.user = userData;
        next()

    } catch (e) {
        return next(ApiError.UnAuthorizedError())
    }
}