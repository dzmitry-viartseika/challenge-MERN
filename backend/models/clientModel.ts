import { Schema, model } from 'mongoose'

const ClientSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
        },
        birthDate: {
            type: String,
        },
        role: {
            type: String,
            default: 'User',
        },
        createdAt: Number,
        updatedAt: Number,
        name: String,
    },
    {
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    }
)

const ClientModel = model('ClientModel', ClientSchema)

export default ClientModel
