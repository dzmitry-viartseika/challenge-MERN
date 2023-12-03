import { Schema, model } from 'mongoose'
import {IClientModel} from "../ts/interfaces/IClientModel";
import {Roles} from "../ts/enums/Roles";

const ClientSchema = new Schema<IClientModel>(
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
            enum: [Roles.ADMIN, Roles.MODERATOR, Roles.CLIENT, Roles.SUPER_ADMIN],
            default: Roles.CLIENT,
        },
        createdAt: Date,
        updatedAt: Date,
        name: String,
    },
    {
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    }
)

const ClientModel = model('ClientModel', ClientSchema)

export default ClientModel
