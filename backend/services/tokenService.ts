import jwt from "jsonwebtoken";
import TokenModel from '../models/tokenModel'
import {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_TOKEN_EXPIRES_IN, JWT_REFRESH_TOKEN_EXPIRES_IN} from "../config/config";

interface ITokenService {
    generateTokens(payload: string): any;
    saveToken(payload: string, refreshToken: string): Promise<any>;
}
class TokenService implements ITokenService {
    generateTokens(payload: string): { accessToken: string; refreshToken: string } {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN
        });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: string, refreshToken: string): Promise<any> {
        const tokenData = await TokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken: string) {
        console.log('removeToken', refreshToken);

        try {
            const result = await TokenModel.findOneAndDelete({ refreshToken: refreshToken });

            if (!result) {
                return {
                    message: 'The File was not found',
                };
            }

            return {
                message: 'File was deleted',
                code: 200
            };
        } catch (error) {
            console.error('Error removing token:', error);
            return {
                message: 'An error occurred while removing the token',
                code: 500
            };
        }
    }

    validateAccessToken(token: string) {
        console.log('token', JWT_ACCESS_SECRET)
        try {
            const userData: any = jwt.verify(token, JWT_ACCESS_SECRET);
            console.log('userDatauserDatauserData', userData)
            return userData;
        } catch (e) {
            console.log('validateAccessToken')
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const userData: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findRefreshToken(refreshToken: string) {
        try {
            console.log('refreshToken', refreshToken)
            const userData = await TokenModel.findOne({ refreshToken: refreshToken });
            return userData;
        } catch (e) {
            return null;
        }
    }

    // async updateAccessToken(refreshToken: string) {
    //     try {
    //         const decodedRefreshToken: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    //         console.log('decodedRefreshToken', decodedRefreshToken)
    //
    //         const newAccessToken = jwt.sign({ userId: decodedRefreshToken.userId }, process.env.JWT_ACCESS_SECRET, {
    //             expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN
    //         });
    //
    //         await this.saveToken(decodedRefreshToken.userId, newAccessToken);
    //
    //         return newAccessToken;
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // }
}

export default new TokenService();