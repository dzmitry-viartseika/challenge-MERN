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
                    'The User is not registered',
                    ResponseStatus.BAD_REQUEST,
                    'USER_IS_NOT_REGISTERED',
                    'Login exception',
                    'Fill in all required fields',
                    new Date(),
                );
                loggerAdapter.error(`${request.method} request to ${request.originalUrl} Code: ${error.errorCode}", Message: ${error.message}`);
                response.status(ResponseStatus.BAD_REQUEST).send({
                    message: error.message,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                    exception: error.exception,
                    status: error.status,
                    timestamp: error.timestamp,
                });
                return
            }

            const loginResult: any = await UserService.login(email, password);
            if (loginResult === null) {
                const error = new HttpError(
                    'The User is not registered',
                    ResponseStatus.BAD_REQUEST,
                    'USER_IS_NOT_REGISTERED',
                    'Login exception',
                    'You entered is not correct data. Check it and try once again',
                    new Date(),
                );

                loggerAdapter.error(`${request.method} request to ${request.originalUrl} Code: ${error.errorCode}", Message: ${error.exception}`);
                response.status(ResponseStatus.BAD_REQUEST).send({
                    message: error.message,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                    exception: error.exception,
                    status: error.status,
                    timestamp: error.timestamp,
                });

                return;
            }

            if (loginResult.errorCode === ResponseStatus.BAD_REQUEST) {
                loggerAdapter.error(`${request.method} request to ${request.originalUrl} Code: ${loginResult.errorCode}", Message: ${loginResult.message}`);
                response.status(ResponseStatus.BAD_REQUEST).send({
                    message: loginResult.message,
                    errorCode: loginResult.errorCode,
                    errorMessage: loginResult.errorMessage,
                    exception: loginResult.exception,
                    status: loginResult.status,
                    timestamp: loginResult.timestamp,
                });
                return;
            }

            response.cookie('refreshToken', loginResult.refreshToken, {maxAge: 30 * 24 * 60 * 60, httpOnly: true, secure: true})
            response.status(ResponseStatus.SUCCESS).send(loginResult);
            loggerAdapter.info(`${request.method} request to ${request.originalUrl} Code: ${ResponseStatus.SUCCESS}`);

        } catch (err: unknown) {
            if (err instanceof Error) {
                const errorMessage = err.message;
                loggerAdapter.error(`${request.method} request to ${request.originalUrl} failed. Response code: "500", response message: ${errorMessage}`);
                response.status(500).send({
                    message: 'Internal Server Error',
                });
            }
        }
    }

    async RegisterUser(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            if (!email || !password) {
                response.status(ResponseStatus.BAD_REQUEST).send({
                    message: 'Fill in all required fields',
                })
            }
            const userData = await UserService.registration(email, password);
            if (!userData) {
                return response.status(ResponseStatus.BAD_REQUEST).send({
                    message: 'The user is not created',
                })
            }
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60, httpOnly: true, secure: true})
            loggerAdapter.info('POST request to "https://localhost:4000/api/v1/register/". Response code: "200"');
            response.status(ResponseStatus.SUCCESS).send({
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
            response.status(ResponseStatus.SUCCESS).send({
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
            response.status(ResponseStatus.SUCCESS).json(userData);
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
                response.status(ResponseStatus.SUCCESS).send({
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
            response.status(ResponseStatus.SUCCESS).send({
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
            response.status(ResponseStatus.SUCCESS).send({
                user: userData,
            });
        }
    }
}

export default new UserController();
