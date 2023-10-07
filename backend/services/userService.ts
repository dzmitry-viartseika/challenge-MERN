import ClientModel from '../models/clientModel'
import {UserSchema} from "../models/userModel";
class UserService {
    async loginUser(email) {
        try {
            const user = await UserSchema.find({email});
            console.log('user', user)
            return {
                user
            }
        } catch (error) {
            throw new Error('Internal Server Error')
        }
    }
}

export default new UserService()
