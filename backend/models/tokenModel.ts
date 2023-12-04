const { Schema, model, Types } = require('mongoose');

const tokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    githubUser: {
        type: String,
        ref: 'GithubUserModel',
    },
    googleUser: {
        type: String,
        ref: 'GoogleUserModel',
    },
    provider: {
        type: String
    }
})

const TokenModel = model('Token', tokenSchema)
export default TokenModel