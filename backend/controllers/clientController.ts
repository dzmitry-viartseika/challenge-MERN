import {Request, Response} from "express";
import UserService from '../services/clientService'
import {logger} from "../logger/logger";

class ClientController {
    getClients = async (request: any, response: Response) => {
        const { page = 1, limit = 10 } = request.query

        try {
            const { clients, totalCount } = await UserService.getClients({
                page,
                limit,
            })

            response.status(200).json({
                clients,
                totalPage: Math.ceil(totalCount / limit),
                currentPage: page,
                totalCount,
                pageSize: limit,
            })
        } catch (error) {
            // logger.error(error, this, {operation: 'getClients'});
            response
                .status(500)
                .send({ code: 500, message: 'Internal Server Error' })
        }
    }

    deleteClient = async (request: Request, response: Response) => {
        const { id } = request.params
        try {
            const result = await UserService.deleteClient(id)

            if (!result) {
                response.status(400).send({
                    code: 400,
                    message: 'The User is not found',
                })
            }

            return response.status(200).send({
                code: 200,
                message: 'The User has deleted successfully',
            })
        } catch (error) {
            response
                .status(500)
                .send({ code: 500, message: 'Internal Server Error' })
        }
    }

    createClient = async (request: Request, response: Response) => {
        const { firstName, lastName, email } = request.body
        try {
            if (!firstName || !lastName || !email) {
                response.status(400).send({
                    code: 400,
                    message: 'Fill in required fields',
                })
            }

            const client = await UserService.createClient(request.body)

            if (client) {
                response.status(200).send({
                    code: 200,
                    client,
                    message: 'The User has been created successfully',
                })
            }
        } catch (error) {
            response.status(500).send({
                code: 500,
                message: 'Internal Server Error',
            })
        }
    }

    getClientById = async (request: Request, response: Response) => {
        const { id } = request.params
        try {
            const result = await UserService.getClientById(id)
            if (!result) {
                response.status(400).send({
                    code: 400,
                    message: 'The User is not found',
                })
            }

            response.status(200).send({
                code: 200,
                client: result && result?.client,
            })
        } catch (error) {
            response.status(500).send({
                code: 500,
                message: 'Internal Server Error',
            })
        }
    }

    updateClientById = async (request: Request, response: Response) => {
        const { id } = request.params
        const { firstName, lastName, email } = request.body

        try {
            if (!firstName || !lastName || !email) {
                response.status(400).send({
                    code: 400,
                    message: 'Fill in required fields',
                })
            }

            const client = await UserService.updateClientById(request.body, id)

            response.status(200).send({
                code: 200,
                client,
                message: 'The User has been updated successfully',
            })
        } catch (error) {
            response.status(500).send({
                code: 500,
                message: 'Internal Server Error',
            })
        }
    }
}

export default new ClientController()
