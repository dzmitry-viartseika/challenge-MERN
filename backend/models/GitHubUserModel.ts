import { Schema, model } from 'mongoose'
import {Roles} from "../ts/enums/Roles";

const GithubUserSchema = new Schema(
    {
        githubId: { type: String, unique: true, required: true },
        provider: String,
        avatarUrl: String,
        displayName: String,
        role: {
                type: String,
                default: Roles.CLIENT
        },
    },
)

const GithubUserModel = model('GithubUserModel', GithubUserSchema)

export default GithubUserModel;