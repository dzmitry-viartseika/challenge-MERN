import express, {Request, Response} from 'express';
import passport from '../config/passport';
import {FAILURE_REDIRECT, SUCCESS_REDIRECT} from "../config/config";

const router = express.Router();

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: FAILURE_REDIRECT, successRedirect: SUCCESS_REDIRECT }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: FAILURE_REDIRECT, successRedirect: SUCCESS_REDIRECT }),
    function (req, res) {
        res.redirect('/');
    });

router.get('/github/user', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

router.get('/google/user', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

export default router;