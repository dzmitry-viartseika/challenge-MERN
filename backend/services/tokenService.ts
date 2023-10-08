import jwt from "jsonwebtoken";
import TokenModel from '../models/tokenModel'
import {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} from "../config/config";
class TokenService {
    generateTokens(payload: string): { accessToken: string; refreshToken: string } {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: '30d'
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
}

export default new TokenService();