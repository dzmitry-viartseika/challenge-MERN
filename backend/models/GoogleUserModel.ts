import { Schema, model } from 'mongoose'

const GoogleUserSchema = new Schema(
    {
        googleId: { type: String, unique: true, required: true },
        provider: String,
        familyName: String,
        givenName: String,
        displayName: String,
        avatarUrl: String,
        roles: [],
    },
)

const GoogleUserModel = model('GoogleUserModel', GoogleUserSchema)

export default GoogleUserModel;
