import jwt from 'jsonwebtoken';
import {NextFunction, Response} from "express";
import {JWT_ACCESS_SECRET} from "../../config/config";
import loggerAdapter from "../../logger/logger";
export const authenticateToken = (request: any, response: Response, next: NextFunction) => {
    const token =  request.header('Authorization').split(' ')[1];

    if (!token) {
        loggerAdapter.error('AuthenticateToken failed. Response code: "401", response message: Authentication token missing');
        return response.status(401).json(
            { message: 'Authentication token missing', code: 401, }
        );
    }

    jwt.verify(token, JWT_ACCESS_SECRET, (err: any, user: any) => {
        if (err) {
            loggerAdapter.error('AuthenticateToken failed. Response code: "403", response message: Token is invalid');
            return response.status(403).json({ message: 'Token is invalid', code: 403,});
        }
        loggerAdapter.info('AuthenticateToken passed. Response code: "200", response message: Token is verified');
        request.user = user;
        next();
    });
}