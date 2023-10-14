import { AxiosResponse } from 'axios';
import $api from '../api';

interface Client {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}

interface ClientsResponse {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  totalPage: number;
  users: Client[];
}

export default class ClientService {
  static createNewClient(data: any): Promise<AxiosResponse<any>> {
    return $api.post<any>('/clients', data);
  }

  static getClients(page = 1): any {
    return $api.get(`/clients?page=${page}`);
  }

  static deleteClient(id: any): Promise<AxiosResponse<any>> {
    return $api.delete(`/clients/${id}`);
  }
}
