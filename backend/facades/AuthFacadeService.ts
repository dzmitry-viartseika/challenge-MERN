import tokenService from "../services/tokenService";
import {UserDto} from "../dto/userDto";
import UserModel from "../models/userModel";
import Authentication from "../utils/auth/Authentication";
import mailService from "../services/mailService";
import { v4 as uuidv4 } from 'uuid';
import {API_VERSION, SERVER_URL} from "../config/config";
import HttpError from "../helpers/httpError";
import {ResponseStatus} from "../ts/enums/ResponseStatus";

class AuthFacadeService {
    async registerUser(email: string, password: string) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            return null;
        }

        const activationLink = uuidv4();
        const hashPassword = await Authentication.passwordHash(password);

        await mailService.sendActivationMail(email, `${SERVER_URL}${API_VERSION}/activate/${activationLink}`);

        const user: any = await UserModel.create({ email, password: hashPassword, activationLink });
        const userDto = new UserDto(user);

        const token: any = tokenService.generateTokens({ ...user });
        await tokenService.saveToken(user._id, token.refreshToken);

        return {
            ...token,
            user: userDto,
        };
    }

    async loginUser(email: string, password: string) {
            const user: any = await UserModel.findOne({email});
            if (!user) {
                return null
            }
            const isPassEquals = await Authentication.passwordCompare(password, user.password);
            if (!isPassEquals) {
                const error = new HttpError(
                    'The email or password are wrong',
                    ResponseStatus.BAD_REQUEST,
                    'USER_IS_NOT_REGISTERED',
                    'Login exception',
                    'Check your data again',
                    new Date(),
                );

                return{
                    message: error.message,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                    exception: error.exception,
                    status: error.status,
                    timestamp: error.timestamp,
                }
            }

            const userDto: any = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(user._id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto,
            }
    }
}

export const facadeService = new AuthFacadeService();