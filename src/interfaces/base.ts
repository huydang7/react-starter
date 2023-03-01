export interface ITimestamp {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
export enum Sort {
  DESC = "DESC",
  ASC = "ASC",
}

export type IOrder = [[key: string, sorter: Sort]];

export interface IPaginationQuery {
  page?: number;
  size?: number;
  order?: IOrder;
}
