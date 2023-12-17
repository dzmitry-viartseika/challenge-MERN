import axios from 'axios';
import UserService from "../services/UserService";
import StorageFactory from "../factory/StorageFactory";

const API_URL = 'https://localhost:4000/';
export const API_VERSION = '/api/v1'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use( (config) => {
  return config;
}, async (error: unknown) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response: any = await UserService.refreshAccessToken({withCredentials: true});
      const localStorageFactory = new StorageFactory('token', 'localStorage');
      localStorageFactory.setStorage('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch (err: unknown) {
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
});

export default $api;
