import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: Number,
        updatedAt: Number,
    },
    {
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    }
)

const UserSchema = model('UserSchema', userSchema)

export default UserSchema
