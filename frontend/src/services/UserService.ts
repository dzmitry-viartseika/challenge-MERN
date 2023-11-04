import { AxiosResponse } from 'axios';
import $api from '../api';
import {API_VERSION} from "../api/api";

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
    return $api.post<any>(`${API_VERSION}/login`, data);
  }

  static registerUser(data: any): any {
    return $api.post(`${API_VERSION}/register`, data);
  }

  static resetUserPassword(data: any): any {
    console.log('data', data)
    return $api.post(`${API_VERSION}/forgot-password`, data);
  }

  static changeUserPassword(data: any): any {
    console.log('data', data)
    return $api.post(`${API_VERSION}/change-password`, data);
  }

  static githubLogin(): any {
    return $api.get(`${API_VERSION}/auth/github`);
  }

  static instagramLogin(): any {
    return $api.get(`${API_VERSION}/auth/instagram`);
  }

  static logOutUser(): any {
    // return $api.delete(`/clients/${id}`);
  }
}
