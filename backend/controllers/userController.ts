import {Request, Response} from "express";
import loggerAdapter from "../logger/logger";
import UserService from "../services/userService";
import HttpError from "../helpers/httpError";
import {ResponseStatus} from "../ts/enums/ResponseStatus";
import {UserDto} from "../dto/userDto";
import {BAD_REQUEST_PAGE} from "../config/config";
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
                response.status(error.code).send({
                    error,
                });
                return;
            }

            const loginResult: any = await UserService.login(email, password);
            if (loginResult === null) {
                const error = new HttpError(
                    'The User is not registered',
                    ResponseStatus.BAD_REQUEST
                );

                // errorCode
                //     :
                //     "INVALID_LOGIN_OR_PASSWORD"
                // errorMessage
                //     :
                //     "Log in exception"
                // exception
                //     :
                //     "You entered not valid login or password. Check it and try once again"
                // status
                //     :
                //     400
                // timestamp
                //     :
                //     "2023-12-12T20:39:48.832911858Z"

                loggerAdapter.error(`${request.method} request to ${request.originalUrl} Code: ${error.code}", Message: ${error.message}`);
                response.send({
                    message: error.message,
                    status: error.code,
                });
            } else if (loginResult.code === 400) {
                loggerAdapter.error(`${request.method} request to ${request.originalUrl} Code: ${loginResult.code}", Message: ${loginResult.message}`);
                const error = new HttpError(
                    loginResult.message,
                    ResponseStatus.BAD_REQUEST
                );
                response.status(error.code).send(error.message);
            } else {
                response.cookie('refreshToken', loginResult.refreshToken, {maxAge: 30 * 24 * 60 * 60, httpOnly: true, secure: true})
                response.status(ResponseStatus.SUCCESS).send(loginResult);
                loggerAdapter.info(`${request.method} request to ${request.originalUrl} Code: ${ResponseStatus.SUCCESS}`);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                const errorMessage = err.message;
                loggerAdapter.error(`POST request to "https://localhost:4000/api/v1/login/" failed. Response code: "500", response message: ${errorMessage}`);
            }
            response.status(500).send({
                message: 'Internal Server Error',
            });
        }
    }

    async RegisterUser(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            if (!email || !password) {
                response.status(400).send({
                    message: 'Fill in all required fields',
                })
            }
            const userData = await UserService.registration(email, password);
            if (!userData) {
                return response.status(400).send({
                    message: 'The user is not created',
                })
            }
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60, httpOnly: true, secure: true})
            loggerAdapter.info('POST request to "https://localhost:4000/api/v1/register/". Response code: "200"');
            response.status(200).send({
                message: 'The user is created successfully',
                user: userData,
            })
        } catch (err: unknown) {
            if (err instanceof Error) {
                const errorMessage = err.message;
                loggerAdapter.error(`POST request to "https://localhost:4000/api/v1/register/" failed. Response code: "500", response message: ${errorMessage}`);
            }
            response.status(500).send({
                message: 'Internal Server Error',
            })
        }
    }

    LogoutUser = async (request: Request, response: Response) => {
        try {
            const { refreshToken } =  request.cookies;
            await UserService.logout(refreshToken);
            response.clearCookie('refreshToken')
            response.status(200).send({
                message: 'The user is logout successfully'
            })
        } catch (err: unknown) {
        if (err instanceof Error) {
            const errorMessage = err.message;
            loggerAdapter.error(`POST request to "https://localhost:4000/api/v1/logout/" failed. Response code: "500", response message: ${errorMessage}`);
        }
            response.status(500).send({
                message: 'Internal Server Error',
            });
        }
    }

    RefreshToken = async (request: Request, response: Response) => {
        try {
            const { refreshToken } = request.cookies;
            const userData: any = await UserService.refreshToken(refreshToken);
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true})
            response.status(200).json(userData);
        } catch (err: unknown) {
            if (err instanceof Error) {
                const errorMessage = err.message;
                loggerAdapter.error(`POST request to "https://localhost:4000/api/v1/refresh-token/" failed. Response code: "500", response message: ${errorMessage}`);
            }
                response.status(500).send({
                    message: 'Internal Server Error',
                });
            }
        }

    ActivateUser = async (request: Request, response: Response) => {
        try {
            const activationLink = request.params.link;
            await UserService.activate(activationLink);
            response.redirect('https://localhost:3000/dashboard');
        } catch (err: unknown) {
            if (err instanceof Error) {
                const errorMessage = err.message;
                loggerAdapter.error(`GET request to "https://localhost:4000/api/v1/activate/:link" failed. Response code: "500", response message: ${errorMessage}`);
            }
            response.status(500).send({
                message: 'Internal Server Error',
            });
        }
    }

    ForgotUserPassword = async (request: Request, response: Response) => {
        const { email } = request.body;
        try {
            const result = await UserService.forgotPassword(email);
            if (result) {
                response.status(200).send({
                    message: 'Check your email out',
                })
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                const errorMessage = err.message;
                loggerAdapter.error(`POST request to "https://localhost:4000/api/v1/forgot-password" failed. Response code: "500", response message: ${errorMessage}`);
            }
            response.status(500).send({
                message: 'Internal Server Error',
            });
        }
    }

    ResetUserPassword = async (request: Request, response: Response) => {
        const resetLink = request.params.link;
        if (resetLink) {
            try {
                const clientResetPasswordUrl = process.env.CLIENT_RESET_PASSWORD_URL
                await UserService.refreshPassword(resetLink);
                if (clientResetPasswordUrl) {
                    return response.redirect(clientResetPasswordUrl)
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    const errorMessage = err.message;
                    loggerAdapter.error(`GET request to "https://localhost:4000/api/v1/forgot-password/:link" failed. Response code: "500", response message: ${errorMessage}`);
                }
                response.status(500).send({
                    message: 'Internal Server Error',
                });
            }
        } else {
            response.redirect(BAD_REQUEST_PAGE)
        }
    }

    ChangeUserPassword = async (request: Request, response: Response) => {
        const { email, password } = request.body;
        try {
            const user: any = await UserService.changePassword(email, password);
            const userDto: any = new UserDto(user);
            response.status(200).send({
                message: 'The password is changed successfully',
                user: userDto,
                // user: userData, // return userDTO
            })
        } catch (err: unknown) {
            if (err instanceof Error) {
                const errorMessage = err.message;
                loggerAdapter.error(`POST request to "https://localhost:4000/api/v1/change-password" failed. Response code: "500", response message: ${errorMessage}`);
            }
            response.status(500).send({
                message: 'Internal Server Error',
            });
        }
    }

    CurrentUser = async (request: Request, response: Response) => {
        if (request.headers && request.headers.authorization) {
            const token = request.headers.authorization.split(' ')[1];
            const userData = await UserService.getCurrentUser(token);
            response.status(200).send({
                user: userData,
            });
        }
    }
}

export default new UserController()
