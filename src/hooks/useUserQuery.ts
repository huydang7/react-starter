import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} from "apis/user";

import { IUser } from "interfaces/user";
import { prettifyQueryMany, prettifyResult, queryClient } from "shared/query";

export const useGetUsers = (query: any) => {
  const result = useQuery(["getUsers", query], () => getUsers(query), {
    refetchOnWindowFocus: false,
    retry: false,
  });
  return prettifyQueryMany<IUser>(result);
};

export const useGetUser = (query: any) => {
  const result = useQuery(["getUser"], () => getUser(query?.id), {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false,
  });
  return prettifyResult<IUser>(result);
};

export const useCreateUser = () => {
  return useMutation(
    ["createUser"],
    (payload: Omit<IUser, "id">) => createUser(payload),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["getUsers"] });
      },
    }
  );
};

export const useUpdateUser = () => {
  return useMutation(
    ["updateUser"],
    (payload: Partial<IUser> & { id: string }) =>
      updateUser(payload.id, payload),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["getUsers"] });
      },
    }
  );
};

export const useDeteleUser = () => {
  return useMutation(
    ["useDeteleUser"],
    (payload: string) => deleteUser(payload),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: ["getUsers"] });
      },
    }
  );
};
