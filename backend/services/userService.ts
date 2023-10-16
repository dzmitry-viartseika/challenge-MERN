import UserModel from "../models/userModel";
import bcrypt from 'bcrypt'
import {UserDto} from "../dto/userDto";
import tokenService from "./tokenService";
import Authentication from "../utils/auth/Authentication";
import jwt from "jsonwebtoken";

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
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            return null
        }
        const hashPassword = await Authentication.passwordHash(password);
        const user: any = await UserModel.create({ email, password: hashPassword });
        const userDto = new UserDto(user);
        const token: any = tokenService.generateTokens({...user});
        await tokenService.saveToken(user._id, token.refreshToken);

        return {
            ...token,
            user: userDto,
        }
    }

    async logout(refreshToken: any) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async forgotPassword(req) {
        const { email } = req.body;

        UserModel.findOne({ email }, async (err, user) => {
            if(err || !user) {
                // throw ApiError.badRequest('Пользователь с таким email не найден')
            }

            const token = jwt.sign(
                {_id: user._id},
                process.env.API_URL,
                {
                    expiresIn: "15m",
                }
            );
            const resetLink = uuid.v4();
            user.resetLink = resetLink;
            user.save();
            const link = `${process.env.API_URL}/api/forgot-password/${resetLink}`;
            await mailService.sendForgotMail(email, link);
        });
    }

    async changePassword(req, res, next) {
        const { email, newPassword } = req.body;

        UserModel.findOne({ email }, async (err, user) => {
            if(err || !user) {
                throw ApiError.badRequest('Пользователь с таким email не найден')
            }

            const token = jwt.sign(
                {_id: user._id},
                process.env.API_URL,
                {
                    expiresIn: "15m",
                }
            );
            const hashPassword = await bcrypt.hash(newPassword, 3);
            user.password = hashPassword;
            user.save();
        });
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if(!user) {
            throw ApiError.badRequest('Некорректная активация ссылки')
        }
        user.isActivated = true;
        await user.save();
    }

    async refreshPassword(resetLink) {
        const user = await UserModel.findOne({ resetLink });
        if(!user) {
            throw ApiError.badRequest('Некорректная активация ссылки')
        }
    }
}

export default new UserService()
