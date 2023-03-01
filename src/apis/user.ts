import { IGetUsersQuery, IUser } from "interfaces/user";
import { stringify } from "qs";
import request from "services/http";

export const getUsers = (query: IGetUsersQuery) => {
  return request.get(`/v1/user?${stringify(query)}`);
};

export const getUser = (id: string) => {
  return request.get(`/v1/user/${id}`);
};

export const createUser = (payload: Omit<IUser, "id">) => {
  return request.post(`/v1/user`, payload);
};
export const updateUser = (id: string, payload: Partial<IUser>) => {
  return request.patch(`/v1/user/${id}`, payload);
};

export const deleteUser = (id: string) => {
  return request.delete(`/v1/user/${id}`);
};
