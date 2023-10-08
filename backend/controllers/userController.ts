import {Request, Response} from "express";
import loggerAdapter from "../logger/logger";
import UserService from "../services/userService";
class UserController {
    LoginUser = async (request: Request, response: Response) => {
        console.log('LoginUser')
        const { email, password } = request.body;
        try {
            const user = await UserService.login(email, password);
            console.log('user', user)
            if (!user) {
                response.status(401).send({
                    code: 401,
                    message: 'Authentication failed'
                })
            } else {
                response.status(200).send({
                    code: 200,
                    user,
                })
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                const errorMessage = err.message;
                loggerAdapter.error(`POST request to "http://localhost:4000/api/v1/login/" failed. Response code: "500", response message: ${errorMessage}`);
            }
            response.status(500).send({
                code: 500,
                message: 'Internal Server Error',
            })
        }
    }

    async RegisterUser(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            if (!email || !password) {
                response.status(400).send({
                    code: 400,
                    message: 'Fill in all required fields',
                })
            }
            const userData = await UserService.registration(email, password);
            if (!userData) {
                response.status(400).send({
                    code: 400,
                    message: 'The user is not created',
                })
            }
            loggerAdapter.info('POST request to "http://localhost:4000/api/v1/register/". Response code: "200"');
            response.status(200).send({
                code: 200,
                message: 'The user is created successfully',
                user: userData,
            })
        } catch (err: unknown) {
            if (err instanceof Error) {
                const errorMessage = err.message;
                loggerAdapter.error(`POST request to "http://localhost:4000/api/v1/register/" failed. Response code: "500", response message: ${errorMessage}`);
            }
            response.status(500).send({
                code: 500,
                message: 'Internal Server Error',
            })
        }
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
