import { stringify } from "qs";
import request from "services/request";

export const getUsers = (query: any) => {
  return request.get(`/v1/user?${stringify(query)}`);
};

export const getUser = (id: any) => {
  return request.get(`/v1/user/${id}`);
};

export const createUser = (payload: any) => {
  return request.post(`/v1/user`, payload);
};
export const updateUser = (id: string, payload: any) => {
  return request.patch(`/v1/user/${id}`, payload);
};

export const deleteUser = (id: string) => {
  return request.delete(`/v1/user/${id}`);
};
