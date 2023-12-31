import {Request, Response} from "express";
import UserService from '../services/clientService'
import loggerAdapter from "../logger/logger";
import {ResponseStatus} from "../ts/enums/ResponseStatus";

class ClientController {
    getClients = async (request: Request, response: Response) => {
        const page = parseInt(request.query.page as string, 10) || 1;
        const limit = parseInt(request.query.limit as string, 10) || 10;

        try {
            const { clients, totalCount } = await UserService.getClients({
                page,
                limit,
            })

            loggerAdapter.info(`GET request to "https://localhost:4000/api/v1/clients/" failed. Response code: "200", response message: OK`);

            response.status(ResponseStatus.SUCCESS).json({
                clients,
                totalPage: Math.ceil(totalCount / limit),
                currentPage: page,
                totalCount,
                pageSize: limit,
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorMessage = error.message;
                loggerAdapter.error(`POST request to "https://localhost:4000/api/v1/clients/" failed. Response code: "500", response message: ${errorMessage}`);
            }
            response
                .status(ResponseStatus.INTERNAL_ERROR)
                .send({message: 'Internal Server Error' })
        }
    }

    deleteClient = async (request: Request, response: Response) => {
        const { id } = request.params
        try {
            const result = await UserService.deleteClient(id)

            if (!result) {
                loggerAdapter.error(`DELETE request to "https://localhost:4000/api/v1/clients/" failed. Response code: "400", response message: The User is not found ID=${id}`);
                response.status(ResponseStatus.BAD_REQUEST).send({
                    message: 'The User is not found',
                })
            }

            loggerAdapter.info(`GET request to "https://localhost:4000/api/v1/clients/" failed. Response code: "200", response message: The User has deleted successfully ID=${id}`);
            response.status(ResponseStatus.SUCCESS).send({
                message: 'The User has deleted successfully',
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorMessage = error.message;
                loggerAdapter.error(`DELETE request to "https://localhost:4000/api/v1/clients/" failed. Response code: "500", response message: ${errorMessage} ID=${id}`);
            }
            response
                .status(ResponseStatus.INTERNAL_ERROR)
                .send({ message: 'Internal Server Error' })
        }
    }

    createClient = async (request: Request, response: Response) => {
        const { firstName, lastName, email } = request.body
        try {
            if (!firstName || !lastName || !email) {
                loggerAdapter.error('POST request to "https://localhost:4000/api/v1/clients/" failed. Response code: "400", response message: Fill in required fields');
                response.status(ResponseStatus.BAD_REQUEST).send({
                    message: 'Fill in required fields',
                })
            }

            const client = await UserService.createClient(request.body)

            if (client) {
                loggerAdapter.info('POST request to "https://localhost:4000/api/v1/clients/" failed. Response code: "200", response message: The User has been created successfully');
                response.status(ResponseStatus.SUCCESS).send({
                    client,
                    message: 'The User has been created successfully',
                })
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorMessage = error.message;
                loggerAdapter.error(`POST request to "https://localhost:4000/api/v1/clients/" failed. Response code: "500", response message: ${errorMessage}`);
            }
            response.status(ResponseStatus.INTERNAL_ERROR).send({
                message: 'Internal Server Error',
            })
        }
    }

    getClientById = async (request: Request, response: Response) => {
        const { id } = request.params
        try {
            const result = await UserService.getClientById(id)
            if (!result) {
                loggerAdapter.error(`GET request to "https://localhost:4000/api/v1/clients/" failed. Response code: "400", response message: The User is not found ID=${id}`);
                response.status(ResponseStatus.BAD_REQUEST).send({
                    message: 'The User is not found',
                })
            }
            loggerAdapter.info('GET request to "https://localhost:4000/api/v1/clients/" failed. Response code: "200", response message: The User has been created successfully');
            response.status(ResponseStatus.SUCCESS).send({
                client: result && result?.client,
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorMessage = error.message;
                loggerAdapter.error(`GET request to "https://localhost:4000/api/v1/clients/" failed. Response code: "500", response message: ${errorMessage} ID=${id}`);
            }
            response.status(ResponseStatus.INTERNAL_ERROR).send({
                message: 'Internal Server Error',
            })
        }
    }

    updateClientById = async (request: Request, response: Response) => {
        const { id } = request.params
        const { firstName, lastName, email } = request.body

        try {
            if (!firstName || !lastName || !email) {
                loggerAdapter.error(`GET request to "https://localhost:4000/api/v1/clients/" failed. Response code: "400", response message: Fill in required fields ID=${id}`);
                response.status(ResponseStatus.BAD_REQUEST).send({
                    message: 'Fill in required fields',
                })
            }

            const client = await UserService.updateClientById(request.body, id)
            loggerAdapter.info(`PUT request to "https://localhost:4000/api/v1/clients/" failed. Response code: "200", response message: The User has been updated successfully ID=${id}`);
            response.status(ResponseStatus.SUCCESS).send({
                client,
                message: 'The User has been updated successfully',
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorMessage = error.message;
                loggerAdapter.error(`PUT request to "https://localhost:4000/api/v1/clients/" failed. Response code: "500", response message: ${errorMessage} ID=${id}`);
            }
            response.status(ResponseStatus.INTERNAL_ERROR).send({
                message: 'Internal Server Error',
            })
        }
    }
}

export default new ClientController()
