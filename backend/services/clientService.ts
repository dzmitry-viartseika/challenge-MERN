import ClientModel from '../models/clientModel'
import {IClientService} from "../ts/interfaces/IClientService";

class ClientService implements IClientService {
    async getClients({ page = 1, limit = 10 }) {
        try {
            const clients = await ClientModel.find({})
                .sort({ firstName: -1 })
                .limit(limit)
                .skip((page - 1) * limit)
                .exec()
            const count = await ClientModel.count()
            return {
                clients,
                totalCount: count,
            }
        } catch (error: unknown) {
            throw new Error('Internal Server Error')
        }
    }

    async getClientById(id: string) {
        try {
            const client = await ClientModel.findById(id)
            if (!client) {
                return null
            }

            return {
                client,
            }
        } catch (error: unknown) {
            throw error
        }
    }

    async updateClientById(data: any, id: string) {
        const { firstName, lastName, email, birthDate, phoneNumber } = data
        try {
            const client = await ClientModel.findById(id)
            if (!client) {
                return null
            }

            client.firstName = firstName
            client.lastName = lastName
            client.email = email
            client.birthDate = birthDate
            client.phoneNumber = phoneNumber

            await client.save()

            return {
                client,
            }
        } catch (error: unknown) {
            throw error
        }
    }
    async createClient(data: any) {
        try {
            const client = await ClientModel.create(data)
            return client
        } catch (error: unknown) {
            throw error
        }
    }

    async deleteClient(id: string) {
        try {
            const client = await ClientModel.findById({ _id: id })
            if (!client) {
                return null
            }
            await client.deleteOne()
            return true
        } catch (error: unknown) {
            throw error
        }
    }
}

export default new ClientService()
