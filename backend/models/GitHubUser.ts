import { Schema, model } from 'mongoose'

const GithubUserSchema = new Schema(
    {
        nodeId: String,
        email: {
            type: String,
            required: true,
        },
    },
)

const GithubUserModel = model('GithubUserModel', GithubUserSchema)

export default GithubUserModel;