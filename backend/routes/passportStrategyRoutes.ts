import express from "express";
import passport from "passport";

const router = express.Router()

// router.get(
//     "/github",
//     passport.authenticate('github', { scope: [ 'user:email' ] }));
// router.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: '/login' }), function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
// });
// router.get('/api/logout', (req, res)=> {
//     // req.logout();
//     //proves that they are signed out as undefined or no content
//     res.send(req.user)
// })
//
// router.get('/api/current_user', (req, res)=> {
//     res.send(req.user)
// })

router.get('/auth/github', passport.authenticate(
        'github', {
            scope: ['user'],
            failureRedirect: '/login',
            failureMessage: true,
            successRedirect: '/'
        })
    );

export default router