import {Roles} from "../enums/Roles";

export interface IUserModel {
    email: string;
    password: string;
    isVerified: boolean;
    activationLink?: string;
    resetLink?: string;
    timeZone?: string;
    language?: string;
    role: Roles;
    createdAt?: Date;
    updatedAt?: Date;
}