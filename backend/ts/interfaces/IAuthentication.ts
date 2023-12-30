export interface IAuthentication {
    passwordHash(password: string): Promise<string>;
    passwordCompare(text: string, encryptedText: string): Promise<boolean>;
}