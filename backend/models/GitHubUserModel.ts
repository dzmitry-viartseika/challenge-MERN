import { Schema, model } from 'mongoose'

const GithubUserSchema = new Schema(
    {
        githubId: { type: String, unique: true },
        provider: String,
        avatarUrl: String,
        displayName: String,
        roles: [],
    },
)

const GithubUserModel = model('GithubUserModel', GithubUserSchema)

export default GithubUserModel;