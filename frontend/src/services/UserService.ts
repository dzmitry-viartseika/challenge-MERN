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
  static loginUser(data: any): any {
    return $api.post<any>('/login', data);
  }

  static registerUser(data: any): any {
    return $api.post('/register', data);
  }

  static resetUserPassword(data: any): any {
    console.log('data', data)
    return $api.post('/forgot-password', data);
  }

  static changeUserPassword(data: any): any {
    console.log('data', data)
    return $api.post('/change-password', data);
  }

  static logOutUser(): any {
    // return $api.delete(`/clients/${id}`);
  }
}
