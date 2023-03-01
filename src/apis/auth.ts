import request from "services/http";

export const login = (payload: { emailL: string; password: string }) => {
  return request.post("/v1/auth/login", payload);
};

export const register = (payload: {
  email: string;
  name: string;
  password: string;
}) => {
  return request.post("/v1/auth/register", payload);
};

export const getMe = () => {
  return request.get("/v1/auth/me");
};

export const checkEmail = (payload: { email: string }) => {
  return request.post("/v1/auth/check-email", payload);
};

export const forgotPassword = (payload: { email: string }) => {
  return request.post("/v1/auth/forgot-password", payload);
};

export const resetPassword = (payload: { token: string; password: string }) => {
  return request.post("/v1/auth/reset-password", payload);
};
