import UserService from '../services/clientService'

class ClientController {
    getClients = async (request: any, response: any) => {
        const { page = 1, limit = 10 } = request.query

        try {
            const { clients, totalCount } = await UserService.getClients({
                page: parseInt(page),
                limit: parseInt(limit),
            })

            response.status(200).json({
                clients,
                totalPage: Math.ceil(totalCount / limit),
                currentPage: page,
                totalCount,
                pageSize: limit,
            })
        } catch (error) {
            response
                .status(500)
                .send({ code: 500, message: 'Internal Server Error' })
        }
    }

    deleteClient = async (request: any, response: any) => {
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

    createClient = async (request: any, response: any) => {
        const { firstName, lastName, email } = request.body
        try {
            if (!firstName || !lastName || !email) {
                response.status(400).send({
                    code: 400,
                    message: 'Fill in required fields',
                })
            }

            const client = await UserService.createClient(request.body)

            response.status(200).send({
                code: 200,
                client,
                message: 'The User has been created successfully',
            })
        } catch (error) {
            console.log(error.message)
            response.status(500).send({
                code: 500,
                message: 'Internal Server Error',
            })
        }
    }

    getClientById = async (request: any, response: any) => {
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
                client: response,
            })
        } catch (error) {
            console.log(error.message)
            response.status(500).send({
                code: 500,
                message: 'Internal Server Error',
            })
        }
    }

    updateClientById = async (request: any, response: any) => {
        const { firstName, lastName, email } = request.body

        try {
            if (!firstName || !lastName || !email) {
                response.status(400).send({
                    code: 400,
                    message: 'Fill in required fields',
                })
            }

            const client = await UserService.updateClientById(request.body)

            response.status(200).send({
                code: 200,
                client,
                message: 'The User has been updated successfully',
            })
        } catch (error) {
            console.log(error.message)
            response.status(500).send({
                code: 500,
                message: 'Internal Server Error',
            })
        }
    }
}

export default new ClientController()
