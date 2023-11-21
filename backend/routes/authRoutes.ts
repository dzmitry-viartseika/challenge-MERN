import express from 'express'
import userController from "../controllers/userController";
import passport from "passport";
import {limiter} from "../middleware/security/rateLimitMiddleWare";
const GitHubStrategy = require('passport-github2').Strategy;




passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/v1/auth/github/callback',
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
        return done(null, profile);
    }
));

passport.serializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         firstName:
 *           type: string
 *           description: The firstName of the client
 *         lastName:
 *           type: string
 *           description: The lastName of the client
 *         email:
 *           type: string
 *           description: The email of the client
 *         phoneNumber:
 *           type: string
 *           description: The phoneNumber of the client
 *         birthDate:
 *           type: string
 *           description: The birthDate of the client
 *         role:
 *           type: string
 *           description: The roles of the client
 *       example:
 *         firstName: User
 *         lastName: Test
 *         email: test@gmail.com
 *         phoneNumber: 123456789
 *         birthday: 01.01.1990
 *         role: User
 */
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The Clients managing API
 * /api/v1/clients:
 *   get:
 *     summary: Lists all the clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: The list of the clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       500:
 *         description: Some server error
 * /api/v1/clients/{id}:
 *   get:
 *     summary: Get the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the client by the id
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Client'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *
 *     responses:
 *       200:
 *         description: The client was deleted
 *       404:
 *         description: The client was not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', userController.LoginUser)
router.post('/register',limiter, userController.RegisterUser)
router.get('/activate/:link',limiter, userController.ActivateUser);
router.get('/logout', userController.LogoutUser)
router.post('/forgot-password',limiter, userController.ForgotUserPassword)
router.get('/forgot-password/:link',limiter, userController.ResetUserPassword)
router.post('/change-password/',limiter, userController.ChangeUserPassword);
router.get('/me', userController.CurrentUser);
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', successRedirect: 'http://localhost:3000/dashboard' }))

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', successRedirect: 'http://localhost:3000/dashboard' }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/github/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        // If the user is not authenticated, send an appropriate response
        res.status(401).json({ message: 'Not authenticated' });
    }
});
export default router;
