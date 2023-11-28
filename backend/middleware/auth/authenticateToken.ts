import jwt, { TokenExpiredError } from 'jsonwebtoken';
import {NextFunction, Response} from "express";
import {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} from "../../config/config";
import loggerAdapter from "../../logger/logger";
import {ApiError} from "../../exceptions/apiError";
import tokenService from "../../services/tokenService";
// export const authenticateToken = (request: any, response: Response, next: NextFunction) => {
//     console.log('request', request)
//     const token =  request.header('Authorization')?.split(' ')[1];
//
//     if (!token) {
//         loggerAdapter.error('AuthenticateToken failed. Response code: "401", response message: Authentication token missing');
//         return response.status(401).json(
//             { message: 'Authentication token missing', code: 401, }
//         );
//     }
//
//     jwt.verify(token, JWT_ACCESS_SECRET, (err: any, user: any) => {
//         if (err instanceof TokenExpiredError) {
//             const refreshToken = request.header('Refresh-Token');
//             console.log('refreshToken', refreshToken)
//             if (!refreshToken) {
//                 loggerAdapter.error('AuthenticateToken failed. Response code: "401", response message: Refresh token missing');
//                 return response.status(401).json({ message: 'Refresh token missing', code: 401 });
//             }
//
//             try {
//                 const decodedRefreshToken: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
//                 console.log('decodedRefreshToken', decodedRefreshToken)
//                 const newAccessToken = jwt.sign({ username: decodedRefreshToken.username, id: decodedRefreshToken.id }, JWT_ACCESS_SECRET, { expiresIn: '15s' });
//
//                 request.user = decodedRefreshToken;
//                 request.newAccessToken = newAccessToken;
//
//                 loggerAdapter.info('AuthenticateToken passed. Response code: "200", response message: Token is verified. New access token generated.');
//                 next();
//             } catch (refreshTokenError) {
//                 loggerAdapter.error('AuthenticateToken failed. Response code: "403", response message: Refresh token is invalid');
//                 return response.status(403).json({ message: 'Refresh token is invalid', code: 403 });
//             }
//         } else {
//             loggerAdapter.error('AuthenticateToken failed. Response code: "403", response message: Token is invalid');
//             return response.status(403).json({ message: 'Token is invalid', code: 403 });
//         }
//
//         loggerAdapter.info('AuthenticateToken passed. Response code: "200", response message: Token is verified');
//         request.user = user;
//         next();
//     });
// };

// export const authenticateToken = (request: any, response: Response, next: NextFunction) => {
//     console.log('request', request)
//     const token =  request.header('Authorization').split(' ')[1];
//
//     if (!token) {
//         loggerAdapter.error('AuthenticateToken failed. Response code: "401", response message: Authentication token missing');
//         return response.status(401).json(
//             { message: 'Authentication token missing', code: 401, }
//         );
//     }
//
//     jwt.verify(token, JWT_ACCESS_SECRET, (err: any, user: any) => {
//         if (err) {
//             loggerAdapter.error('AuthenticateToken failed. Response code: "403", response message: Token is invalid');
//             return response.status(403).json({ message: 'Token is invalid', code: 403,});
//         }
//         loggerAdapter.info('AuthenticateToken passed. Response code: "200", response message: Token is verified');
//         request.user = user;
//         next();
//     });
// }

export const authenticateToken = (req: any, res: any, next: any) => {
    try {
        const token =  req.header('Authorization').split(' ')[1];

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