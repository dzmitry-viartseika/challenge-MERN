export class UserDto {
    email: string;
    isVerified: boolean;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;

    constructor(model: { email: string, isVerified: boolean, roles: string[], createdAt: Date, updatedAt: Date}) {
        this.email = model.email;
        this.isVerified = model.isVerified;
        this.roles = model.roles;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}