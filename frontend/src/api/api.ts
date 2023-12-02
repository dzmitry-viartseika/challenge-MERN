import axios from 'axios';
import UserService from "../services/UserService";

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
}, async (error: any) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response: any = await UserService.refreshAccessToken({withCredentials: true});
      console.log('response. 401401401401', response)
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch (e) {
      console.log('e', e)
    }
  }
});

export default $api;
