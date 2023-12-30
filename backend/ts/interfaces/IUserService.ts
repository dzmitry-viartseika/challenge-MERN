export interface IUserService {
    login(email: string, password: string): Promise<any>;
    registration(email: string, password: string,): Promise<any>;
}