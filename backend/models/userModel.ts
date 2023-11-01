import { Schema, model } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
        email: {
            type: String,
            required: [true, 'Please provide the email address'],
            unique: true,
            validate: {
                validator: (value: string) => validator.isEmail(value),
                message: 'Please provide a valid email address',
            },
        },
        password: {
            type: String,
            required: [true, 'Please provide the password'],
            validate: {
                validator: (value: string) => value.length >= 6,
                message: 'Password must be at least 6 characters long',
            },
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
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
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