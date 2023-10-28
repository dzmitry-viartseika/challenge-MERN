// import userController from "../controllers/userController";
import express from "express";

const router = express.Router()

// router.post('/login', userController.LoginUser)
// router.post('/register', userController.RegisterUser)
// router.get('/activate/:link', userController.ActivateUser);
// router.get('/logout', userController.LogoutUser)
// router.post('/forgot-password', userController.ForgotUserPassword)
// router.get('/forgot-password/:link', userController.ResetUserPassword)
// router.post('/change-password/', userController.ChangeUserPassword);

router.get('/auth/google');
router.get('/auth/google/callback');

export default router