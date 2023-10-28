import UserModel from "../models/userModel";
import {UserDto} from "../dto/userDto";
import tokenService from "./tokenService";
import Authentication from "../utils/auth/Authentication";
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mailService";
import {API_VERSION, SERVER_URL} from "../config/config";
import bcrypt from "bcrypt";
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
        await mailService.sendActivationMail(email, `http://localhost:4000/api/v1/activate/${activationLink}`);
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
        console.log('email', email)
        console.log('password', password)

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
        console.log('user', user);
        console.log('resetLink', resetLink);
        return true;
    }
}

export default new UserService()
