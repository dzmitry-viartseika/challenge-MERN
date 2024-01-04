import bcrypt from 'bcrypt';
import {PASSWORD_SALT} from "../../config/config";
import {IAuthentication} from "../../ts/interfaces/IAuthentication";

class Authentication implements IAuthentication {
    public async passwordHash(password: string): Promise<string> {
        return bcrypt.hash(password, PASSWORD_SALT);
    }

    public async passwordCompare(
        text: string,
        encryptedText: string
    ): Promise<boolean> {
        return bcrypt.compare(text, encryptedText);
    }
}

export default new Authentication();