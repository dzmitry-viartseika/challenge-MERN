import { Schema, model, mongoose } from 'mongoose'

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
                type: mongoose.Schema.Types.ObjectId,
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

export const UserSchema = model('UserSchema', userSchema)

export const getUserByEmail = (email: string) => UserSchema.findOne({email})
