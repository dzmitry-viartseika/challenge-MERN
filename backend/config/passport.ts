import passport from 'passport';
const GitHubStrategy = require('passport-github2').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.OAUTH2_GOOGLE_CLIENT_ID,
        clientSecret: process.env.OAUTH2_GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/v1/auth/github/callback',
        // callbackURL: "http://localhost:4000/auth/google/callback",
        // passReqToCallback   : true
    },
        (accessToken, refreshToken, profile, done) => {
            // GoogleUserModel.findOne({googleId: profile.id})
            //     .then(existingUser => {
            //         if (existingUser) {
            //             console.log(existingUser); // we already have  a record with the id
            //             done(null, existingUser);
            //         }
            //         else {
            //             new GoogleUserModel({googleId: profile.id}).save()// remember .save is async so .then
            //                 .then(user => {
            //                     done(null, user);
            //                 })
            //         }
            //     })
            return done(null, profile);
        })
);

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/v1/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});