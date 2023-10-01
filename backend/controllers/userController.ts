import {Request, Response} from "express";
import {logger} from "../logger/logger";
import UserModel from "../models/userModel";
import UserService from "../services/clientService";
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const saltRounds = 10 //required by bcrypt

class UserController {
    RegisterUser = async (request: Request, response: Response) => {
        const { email, password } = request.body;

        try {
            if (!email || !password) {
                response.status(400).send({
                    code: 400,
                    message: 'Fill in required fields',
                })
            }

            const user = 'test'

            if (user) {
                response.status(400).send({
                    code: 400,
                    message: 'User Already Exists! Login or choose another email',
                })
            }

            const newUser = await UserService.createClient(request.body)

            if (newUser) {
                response.status(200).send({
                    code: 200,
                    newUser,
                    message: 'The User has been created successfully',
                })
            }

        } catch (err) {
            logger.error(err);
            response.status(500).send({
                code: 500,
                message: 'Internal Server Error',
            })
        }

    }
    LoginUser = async (request: Request, response: Response) => {
        console.log('SignInUser')
    }

    LogoutUser = async (request: Request, response: Response) => {
        console.log('LogoutUser')
        // req.session.destroy(function(){
        //     console.log("user logged out.")
        // });
        // res.redirect('/login');
    }
}

export default new UserController()
