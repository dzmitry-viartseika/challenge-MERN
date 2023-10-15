import {Request, Response} from "express";
import loggerAdapter from "../logger/logger";
import UserService from "../services/userService";
import HttpError from "../helpers/httpError";
import {ResponseStatus} from "../ts/enums/ResponseStatus";
class UserController {
    LoginUser = async (request: Request, response: Response) => {
        const { email, password } = request.body;
        try {

            if (!email || !password) {
                const error = new HttpError(
                    'Fill in all required fields',
                    ResponseStatus.BAD_REQUEST
                );
                loggerAdapter.error(`${request.method} request to ${request.originalUrl} Code: ${error.code}", Message: ${error.message}`);
                response.status(error.code).send(error.message)
                return
            }

            const user = await UserService.login(email, password);
            if (!user) {
                const error = new HttpError(
                    'The User is not registered',
                    ResponseStatus.NOT_FOUND
                );
                loggerAdapter.error(`${request.method} request to ${request.originalUrl} Code: ${error.code}", Message: ${error.message}`);
                response.status(error.code).send(error.message)
                // return response.redirect('/login');
            } else {
                response.status(ResponseStatus.SUCCESS).send({
                    code: ResponseStatus.SUCCESS,
                    user,
                })
                loggerAdapter.info(`${request.method} request to ${request.originalUrl} Code: ${ResponseStatus.SUCCESS}`);
                // return  response.redirect('/dashboard');
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
            console.log('userData', userData)
            if (!userData) {
                return response.status(400).send({
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
        const { refreshToken } =  request.cookies;
        const token = await UserService.logout(refreshToken);
        // request.clearCookie('refreshToken');
        // request.clearCookie('accessToken');
        response.status(200).send({
            message: 'The user is logout successfully',
            token,
        })
    }


}

export default new UserController()
