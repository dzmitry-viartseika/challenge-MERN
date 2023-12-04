import UserModel from "../models/userModel";
import {UserDto} from "../dto/userDto";
import tokenService from "./tokenService";
import Authentication from "../utils/auth/Authentication";
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mailService";
import {API_VERSION, JWT_ACCESS_SECRET, SERVER_URL} from "../config/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {ApiError} from "../exceptions/apiError";
import {facadeService} from "../facades/AuthFacadeService";
interface IUserService {
    login(email: string, password: string): Promise<any>;
    registration(email: string, password: string,): Promise<any>;
}


class UserService implements IUserService {
    async login(email: string, password: string) {
        try {
            const user: any = await UserModel.findOne({email});
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
        const registrationResult = await facadeService.registerUser(email, password);
        return registrationResult;
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
        const tokenFromDB = await tokenService.findRefreshToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnAuthorizedError()
        }

        const user: any = await UserModel.findById(userData._id)
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
        try {
            const currentUser: any = jwt.verify(token, JWT_ACCESS_SECRET);
            const userDto: any = new UserDto(currentUser);
            console.log('userDto', userDto)
            return userDto
        } catch (error) {
            // If the token is invalid or has expired, catch the error here
            // res.status(401).json({ message: 'Invalid token' });
        }
    }
}

export default new UserService()
