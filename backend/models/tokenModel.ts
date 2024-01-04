import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
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

const TokenModel = mongoose.model('Token', tokenSchema)
export default TokenModel