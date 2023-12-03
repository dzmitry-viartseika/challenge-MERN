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
        type: Types.ObjectId,
        ref: 'GithubUserModel',
    },
    googleUser: {
        type: Types.ObjectId,
        ref: 'GoogleUserModel',
    },
})

const TokenModel = model('Token', tokenSchema)
export default TokenModel