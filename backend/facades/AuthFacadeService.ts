import tokenService from "../services/tokenService";
import {UserDto} from "../dto/userDto";
import UserModel from "../models/userModel";
import Authentication from "../utils/auth/Authentication";
import mailService from "../services/mailService";
import { v4 as uuidv4 } from 'uuid';

class AuthFacadeService {
    async registerUser(email: string, password: string) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            return null;
        }

        const activationLink = uuidv4();
        const hashPassword = await Authentication.passwordHash(password);

        await mailService.sendActivationMail(email, `https://localhost:4000/api/v1/activate/${activationLink}`);

        const user: any = await UserModel.create({ email, password: hashPassword, activationLink });
        const userDto = new UserDto(user);

        const token: any = tokenService.generateTokens({ ...user });
        await tokenService.saveToken(user._id, token.refreshToken);

        return {
            ...token,
            user: userDto,
        };
    }
}

export const facadeService = new AuthFacadeService();