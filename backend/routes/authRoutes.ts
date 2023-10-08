import express from 'express'
import userController from "../controllers/userController";

const router = express.Router()

router.post('/login', userController.LoginUser)
router.post('/register', userController.RegisterUser)
router.get('/logout')

export default router
