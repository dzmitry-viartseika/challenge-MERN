import UserModel from "../models/userModel";
import {UserDto} from "../dto/userDto";
import tokenService from "./tokenService";
import Authentication from "../utils/auth/Authentication";
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mailService";
import {API_VERSION, JWT_ACCESS_SECRET, SERVER_URL} from "../config/config";
import bcrypt from "bcrypt";
import TokenModel from "../models/tokenModel";
import jwt from "jsonwebtoken";
import {ApiError} from "../exceptions/apiError";
interface IUserService {
    login(email: string, password: string): Promise<any>;
    registration(email: string, password: string,): Promise<any>;
}


class UserService implements IUserService {
    async login(email: string, password: string) {
        try {
            const user: any = await UserModel.findOne({email});
            console.log('user', user)
            if (!user) {
                return null
            }
            const isPassEquals = await Authentication.passwordCompare(password, user.password);
            if (!isPassEquals) {
                return {
                    code: 400,
                    message: 'The email or password are wrong'
                }
            }

            const userDto: any = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(user._id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto,
            }
        } catch (error: unknown) {
            throw new Error('Internal Server Error')
        }
    }

    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            return null
        }
        const activationLink = uuidv4();
        const hashPassword = await Authentication.passwordHash(password);
        await mailService.sendActivationMail(email, `https://localhost:4000/api/v1/activate/${activationLink}`);
        const user: any = await UserModel.create({ email, password: hashPassword, activationLink });
        const userDto = new UserDto(user);
        const token: any = tokenService.generateTokens({...user});
        await tokenService.saveToken(user._id, token.refreshToken);

        return {
            ...token,
            user: userDto,
        }
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnAuthorizedError()
        }

        const userData: any = tokenService.validateRefreshToken(refreshToken);
        console.log('userData', userData)
        console.log('userData._doc._id', userData._doc._id)
        const tokenFromDB = await tokenService.findRefreshToken(refreshToken);
        console.log('tokenFromDB', tokenFromDB)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnAuthorizedError()
        }

        const user: any = await UserModel.findById(userData._doc._id)
        console.log('user', user)
        const userDto: any = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens, user: userDto
        }
    }

    async forgotPassword(email: string) {

        const user: any = await UserModel.findOne({ email });
        if (!user) {
            return false
        }

        const resetLink = uuidv4();
        user.resetLink = resetLink;
        user.save();
        const link = `${SERVER_URL}${API_VERSION}/forgot-password/${resetLink}`;
        await mailService.sendForgotMail(email, link);
        return true;
    }

    async changePassword(email: string, password: string) {
        const user: any = await UserModel.findOne({ email });
        if (!user) {
            return false
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        user.save();
        const userDto = new UserDto(user);
        return {
            user: userDto,
        }
    }

    async activate(activationLink: string) {
        const user: any = await UserModel.findOne({ activationLink });
        if(!user) {
            return null;
            // throw ApiError.badRequest('Некорректная активация ссылки')
        }
        user.isVerified = true;
        await user.save();
    }

    async refreshPassword(resetLink: string) {
        const user: any = await UserModel.findOne({ resetLink });
        if(!user) {
            return null;
            // throw ApiError.badRequest('Некорректная активация ссылки')
        }
        return true;
    }

    async getCurrentUser(token: string) {

        // if (!token || !token.startsWith('Bearer ')) {
        //     return res.status(401).json({ message: 'Invalid token format' });
        // }

        // Extract the token without the "Bearer " prefix
        // const tokenValue = token.split(' ')[1];

        try {
            // Verify and decode the token using your secret key
            const decoded: any = jwt.verify(token, JWT_ACCESS_SECRET);
            // The current user is available in the decoded payload
            const currentUser = decoded._doc
            const userDto: any = new UserDto(decoded._doc);
            return userDto
        } catch (error) {
            // If the token is invalid or has expired, catch the error here
            // res.status(401).json({ message: 'Invalid token' });
        }
    }
}

export default new UserService()
