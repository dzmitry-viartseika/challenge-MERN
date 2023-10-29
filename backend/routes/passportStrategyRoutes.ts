import express from "express";
import passport from "passport";

const router = express.Router()

router.get(
    "/google",
    passport.authenticate('google', {
        scope: ["profile", "email"]
    }));
router.get("/auth/google/callback", passport.authenticate("google"));
router.get('/api/logout', (req, res)=> {
    // req.logout();
    //proves that they are signed out as undefined or no content
    res.send(req.user)
})

router.get('/api/current_user', (req, res)=> {
    res.send(req.user)
})

export default router