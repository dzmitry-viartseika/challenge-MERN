import UserModel from "../models/userModel";
import {UserDto} from "../dto/userDto";
import tokenService from "./tokenService";
import Authentication from "../utils/auth/Authentication";
import { v4 as uuidv4 } from 'uuid';
import mailService from "./mailService";
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

    async forgotPassword(request: Request) {
        const { email }: any = request.body;

        const user: any = await UserModel.findOne({ email });
        if (!user) {
            return false
        }

        const resetLink = uuidv4();
        user.resetLink = resetLink;
        user.save();
        const link = `${process.env.API_URL}/api/forgot-password/${resetLink}`;
        await mailService.sendForgotMail(email, link);
        return true;
    }

    // async changePassword(req, res, next) {
    //     const { email, newPassword } = req.body;
    //
    //     UserModel.findOne({ email }, async (err, user) => {
    //         if(err || !user) {
    //             throw ApiError.badRequest('Пользователь с таким email не найден')
    //         }
    //
    //         const token = jwt.sign(
    //             {_id: user._id},
    //             process.env.API_URL,
    //             {
    //                 expiresIn: "15m",
    //             }
    //         );
    //         const hashPassword = await bcrypt.hash(newPassword, 3);
    //         user.password = hashPassword;
    //         user.save();
    //     });
    // }

    async activate(activationLink: string) {
        const user: any = await UserModel.findOne({ activationLink });
        console.log('user', user)
        if(!user) {
            // throw ApiError.badRequest('Некорректная активация ссылки')
        }
        user.isVerified = true;
        await user.save();
    }

    // async refreshPassword(resetLink) {
    //     const user = await UserModel.findOne({ resetLink });
    //     if(!user) {
    //         throw ApiError.badRequest('Некорректная активация ссылки')
    //     }
    // }
}

export default new UserService()
