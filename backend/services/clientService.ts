import ClientModel from '../models/clientModel'
class ClientService {
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
        } catch (error) {
            throw new Error('Internal Server Error')
        }
    }

    async getClientById(id: string) {
        try {
            const client = await ClientModel.find({ _id: id })

            if (!client) {
                return null
            }

            return client
        } catch (error) {
            throw error
        }
    }

    async updateClientById(data: any) {
        const { id, firstName, lastName, email, birthDate, phoneNumber } = data
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
        } catch (error) {
            throw error
        }
    }
    async createClient(data: any) {
        try {
            const client = await ClientModel.create(data)
            return client
        } catch (error) {
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
        } catch (error) {
            throw error
        }
    }
}

export default new ClientService()
