import { Schema, model } from 'mongoose'

const GoogleUserSchema = new Schema(
    {
        googleId: String,
    },
)

const GoogleUserModel = model('GoogleUserModel', GoogleUserSchema)

export default GoogleUserModel
