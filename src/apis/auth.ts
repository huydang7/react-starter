import request from "services/request";

export const login = (payload: any) => {
  return request.post("/v1/auth/login", payload);
};

export const register = (payload: any) => {
  return request.post("/v1/auth/register", payload);
};

export const getMe = () => {
  return request.get("/v1/auth/me");
};

export const checkEmail = (payload: any) => {
  return request.post("/v1/auth/check-email", payload);
};

export const forgotPassword = (payload: any) => {
  return request.post("/v1/auth/forgot-password", payload);
};

export const resetPassword = (payload: any) => {
  return request.post("/v1/auth/reset-password", payload);
};
