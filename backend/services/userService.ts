import UserModel from "../models/userModel";
import bcrypt from 'bcrypt'
import {UserDto} from "../dto/userDto";
import tokenService from "./tokenService";

interface IUserService {
    login(email: string, password: string): Promise<any>;
    registration(email: string, password: string,): Promise<any>;
}


class UserService implements IUserService {
    async login(email: string, password: string) {
        try {
            const user: any = await UserModel.findOne({email});
            if (!user) {
                return {
                    code: 400,
                    message: 'The user is not found'
                }
            }
            console.log('password', password)
            console.log('user', user)
            const isPassEquals = await bcrypt.compare(password, user.password);
            console.log('isPassEquals', isPassEquals)
            if (!isPassEquals) {
                return {
                    code: 400,
                    message: 'The email or password are wrong'
                }
            }

            const userDto: any = new UserDto(user);
            console.log('userDto', userDto)
            const tokens = tokenService.generateTokens({...userDto});
            console.log('tokens', tokens)
            await tokenService.saveToken(user._id, tokens.refreshToken);

            return {
                ...tokens,
                user,
            }
        } catch (error) {
            throw new Error('Internal Server Error')
        }
    }

    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            return {
                code: 400,
                message: 'The User is already exist'
            }
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user: any = await UserModel.create({ email, password: hashPassword });
        const userDto = new UserDto(user);
        const token: any = tokenService.generateTokens({...user});
        await tokenService.saveToken(user._id, token.refreshToken);

        return {
            ...token,
            user: userDto,
        }
    }
}

export default new UserService()
