import { Schema, model } from 'mongoose'
import {Roles} from "../ts/enums/Roles";

const GoogleUserSchema = new Schema(
    {
        googleId: { type: String, unique: true, required: true },
        provider: String,
        familyName: String,
        givenName: String,
        displayName: String,
        avatarUrl: String,
            role: {
                    type: String,
                    default: Roles.CLIENT
            },
    },
)

const GoogleUserModel = model('GoogleUserModel', GoogleUserSchema)

export default GoogleUserModel;
