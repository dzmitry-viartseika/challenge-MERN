export interface ITokenService {
    generateTokens(payload: string): any;
    saveToken(payload: string, refreshToken: string): Promise<any>;
}