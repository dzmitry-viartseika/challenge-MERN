import passport from 'passport';
import UserModel from "../models/userModel";
import GoogleUserModel from "../models/GoogleUserModel";
import GithubUserModel from "../models/GitHubUserModel";
import tokenService from "../services/tokenService";
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/v1/auth/github/callback',
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    const mappedUser = {
        provider: profile.provider,
        avatarUrl: profile.photos[0].value,
        displayName: profile.displayName,
        githubId: profile.id,
    }

    const currentUser: any = await GithubUserModel.findOne({githubId: profile.id});

    if (!currentUser) {
        const result: any = await GithubUserModel.create(mappedUser);
        const tokens = tokenService.generateTokens({...result});
        await tokenService.saveToken(profile.id, tokens.refreshToken);
        return done(null, {
            ...result,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    }

    return done(null, {
        ...mappedUser,
        accessToken,
    });
}));

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH2_GOOGLE_CLIENT_ID,
    clientSecret: process.env.OAUTH2_GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/v1/auth/google/callback',
    scope: ['profile'],
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    const mappedUser = {
        provider: profile.provider,
        familyName: profile.name.familyName,
        givenName: profile.name.givenName,
        avatarUrl: profile.photos[0].value,
        displayName: profile.displayName,
        googleId: profile.id,
    }

    const currentUser: any = await GoogleUserModel.findOne({googleId: profile.id});

    if (!currentUser) {
        const result: any = await GoogleUserModel.create(mappedUser);
        await tokenService.saveToken(profile.id, refreshToken);
        return done(null, {
            ...result,
            accessToken,
        });
    }

    return done(null, {
        ...mappedUser,
        accessToken,
    });
}));

passport.serializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

export default passport;