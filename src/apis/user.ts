import { IGetUsersQuery, IUser } from 'interfaces/user';
import { stringify } from 'qs';
import request from 'services/http';

export const getUsers = (query: IGetUsersQuery) => {
  return request.get(`/user?${stringify(query)}`);
};

export const getUser = (id: string) => {
  return request.get(`/user/${id}`);
};

export const createUser = (payload: Omit<IUser, 'id'>) => {
  return request.post(`/user`, payload);
};
export const updateUser = (id: string, payload: Partial<IUser>) => {
  return request.patch(`/user/${id}`, payload);
};

export const deleteUser = (id: string) => {
  return request.delete(`/user/${id}`);
};
