import { AxiosResponse } from 'axios';
import $api from '../api';

// interface Client {
//   firstName: string;
//   lastName: string;
//   email: string;
//   birthday: string;
// }
//
// interface ClientsResponse {
//   currentPage: number;
//   totalCount: number;
//   pageSize: number;
//   totalPage: number;
//   users: Client[];
// }

export default class UserService {
  static loginUser(data: any): Promise<AxiosResponse<any>> {
    return $api.post<any>('/login', data);
  }

  static registerUser(data): any {
    return $api.post('/register', data);
  }

  static logOutUser(): Promise<AxiosResponse<any>> {
    // return $api.delete(`/clients/${id}`);
  }
}
