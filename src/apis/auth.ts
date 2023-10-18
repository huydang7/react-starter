import request from '@/services/http';

export const login = (payload: { emailL: string; password: string }) => {
  return request.post('/auth/login', payload);
};

export const register = (payload: { email: string; name: string; password: string }) => {
  return request.post('/auth/register', payload);
};

export const getMe = () => {
  return request.get('/auth/me');
};

export const checkEmail = (payload: { email: string }) => {
  return request.post('/auth/check-email', payload);
};

export const forgotPassword = (payload: { email: string }) => {
  return request.post('/auth/forgot-password', payload);
};

export const resetPassword = (payload: { token: string; password: string }) => {
  return request.post('/auth/reset-password', payload);
};
