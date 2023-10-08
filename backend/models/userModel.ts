import { Schema, model } from 'mongoose'
import TokenModel from "./tokenModel";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
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
    }
)

const UserModel = model('UserSchema', userSchema)

export default UserModel
