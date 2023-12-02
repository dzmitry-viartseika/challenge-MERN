import { Schema, model } from 'mongoose';
import validator from 'validator';
import { Roles } from '../ts/enums/Roles'

interface IUser {
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

const userSchema = new Schema<IUser>({
        email: {
            type: String,
            required: [true, 'Please provide the email address'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide the password'],
            trim: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        activationLink: {
            type: String,
        },
        resetLink: {
            type: String,
        },
        timeZone: {
            type: String,
        },
        language: {
            type: String,
        },
        role: {
            type: String,
            enum: [Roles.ADMIN, Roles.MODERATOR, Roles.CLIENT, Roles.SUPER_ADMIN],
            default: Roles.CLIENT,
        },
        createdAt: {
            type: Date,
            default: new Date(),
        },
        updatedAt: {
            type: Date,
            default: new Date(),
        },
    },
    {
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    });

const UserModel = model('User', userSchema);

export default UserModel;