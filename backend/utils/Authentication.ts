import bcrypt from "bcrypt";

interface IAuthentication {
    passwordHash(password: string): Promise<string>;
    passwordCompare(text: string, encryptedText: string): Promise<boolean>;
}

class Authentication implements IAuthentication {
    public async passwordHash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public async passwordCompare(
        text: string,
        encryptedText: string
    ): Promise<boolean> {
        return bcrypt.compare(text, encryptedText);
    }
}

export default new Authentication();