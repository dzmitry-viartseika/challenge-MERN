import { AxiosResponse } from 'axios';
import $api from '../api';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}

interface UsersResponse {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  totalPage: number;
  users: User[];
}

export default class UsersService {
  static createNewUser(data: any): Promise<AxiosResponse<any>> {
    return $api.post<any>('/clients', data);
  }

  static getUsers(page = 1): Promise<AxiosResponse<UsersResponse>> {
    return $api.get(`/clients?page=${page}`);
  }

  static deleteUser(id: any): Promise<AxiosResponse<any>> {
    console.log('id', id);
    return $api.delete(`/clients/${id}`);
  }
}
