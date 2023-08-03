import { IPaginationQuery, ITimestamp } from './base';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser extends ITimestamp {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isEmailVerified: boolean;
}

export interface IGetUsersQuery extends IPaginationQuery {}
