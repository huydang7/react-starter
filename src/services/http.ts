import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/stores/auth';

import * as AuthService from './auth';
import { CONFIGS } from './config';

const requestAuthInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().tokens?.access.value;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }
  return config;
};

const responseRejectInterceptor = (error: any) => {
  if (error.response?.status === 401) {
    AuthService.logOut();
  }
  throw error;
};

const responseFulfilledInterceptor = (response: AxiosResponse<any, any>) => {
  return response;
};

const instance = axios.create({
  baseURL: CONFIGS.API_URL,
});

instance.interceptors.request.use(requestAuthInterceptor);

instance.interceptors.response.use(responseFulfilledInterceptor, responseRejectInterceptor);

export default instance;
