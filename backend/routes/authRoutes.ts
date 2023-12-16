import express from 'express'
import userController from "../controllers/userController";
import { limiter } from "../middleware/security/rateLimitMiddleWare";


const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 * /api/v1/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                 errorCode:
 *                   type: string
 *                   description: Error code
 *                 errorMessage:
 *                   type: string
 *                   description: Detailed error message
 *                 exception:
 *                   type: string
 *                   description: Exception details
 *                 status:
 *                   type: number
 *                   description: HTTP status code
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of the error
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post('/login', userController.LoginUser)
router.post('/register',limiter, userController.RegisterUser)
router.get('/activate/:link',limiter, userController.ActivateUser);
router.post('/logout', userController.LogoutUser)
router.post('/refresh-token', userController.RefreshToken)
router.post('/forgot-password',limiter, userController.ForgotUserPassword)
router.get('/forgot-password/:link',limiter, userController.ResetUserPassword)
router.post('/change-password',limiter, userController.ChangeUserPassword);
router.get('/me', userController.CurrentUser);
export default router;