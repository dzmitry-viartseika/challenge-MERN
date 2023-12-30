export interface IClientService {
    getClients(page: any, limit: any): Promise<any>;
    getClientById(id: string): Promise<any>;
    updateClientById(data: any, id: string): Promise<any>;
    createClient(data: any): Promise<any>
    deleteClient(id: string): Promise<any>
}