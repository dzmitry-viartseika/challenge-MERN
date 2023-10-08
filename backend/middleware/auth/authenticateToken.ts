import jwt from 'jsonwebtoken';
import {NextFunction, Response} from "express";
import {JWT_ACCESS_SECRET} from "../../config/config";
export const authenticateToken = (request: any, response: Response, next: NextFunction) => {
    const token = request.header('Authorization');

    if (!token) {
        return response.status(401).json(
            { message: 'Authentication token missing', code: 401, }
        );
    }

    jwt.verify(token, JWT_ACCESS_SECRET, (err: any, user: any) => {
        if (err) {
            return response.status(403).json({ message: 'Token is invalid', code: 403,});
        }
        request.user = user;
        next();
    });
}