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

    async removeToken(refreshToken: any) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    }
}

export default new TokenService();