import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} from "apis/user";

import { IGetUsersQuery, IUser } from "interfaces/user";
import { prettifyQueryMany, prettifyResult, queryClient } from "shared/query";

export const useGetUsers = (query: IGetUsersQuery) => {
  const result = useQuery(["getUsers", query], () => getUsers(query), {
    refetchOnWindowFocus: false,
    retry: false,
  });
  return prettifyQueryMany<IUser>(result);
};

export const useGetUser = (id: string) => {
  const result = useQuery(["getUser", id], () => getUser(id), {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false,
  });
  return prettifyResult<IUser>(result);
};

export const useCreateUser = () => {
  return useMutation((payload: Omit<IUser, "id">) => createUser(payload), {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });
};

export const useUpdateUser = () => {
  return useMutation(
    (payload: { id: string; user: Partial<IUser> }) =>
      updateUser(payload.id, payload.user),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["getUsers"] });
      },
    }
  );
};

export const useDeteleUser = () => {
  return useMutation((id: string) => deleteUser(id), {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });
};
