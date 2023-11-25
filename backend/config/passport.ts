import passport from 'passport';
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/v1/auth/github/callback',
}, function (accessToken: string, refreshToken: string, profile: any, done: any) {
    return done(null, profile);
}));

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH2_GOOGLE_CLIENT_ID,
    clientSecret: process.env.OAUTH2_GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/v1/auth/google/callback',
    scope: ['profile'],
}, function (accessToken: string, refreshToken: string, profile: any, done: any) {
    console.log('profile', profile)
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return cb(err, user);
    // });
    return done(null, profile);
}));

passport.serializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

export default passport;