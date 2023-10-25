import { useMutation, useQuery } from '@tanstack/react-query';

import { createUser, deleteUser, getUser, getUsers, updateUser } from '@/apis/user';
import { IUser } from '@/interfaces/user';
import { prettifyQueryManyResult, prettifyQueryResult, queryClient } from '@/shared/utils';

export const useGetUsers = (query: any) => {
  const resp = useQuery({
    queryKey: ['getUsers'],
    queryFn: () => getUsers(query),
  });
  return prettifyQueryManyResult<IUser>(resp);
};

export const useGetUser = (id: string) => {
  const resp = useQuery({
    queryKey: ['getUser', id],
    queryFn: () => getUser(id),
  });
  return prettifyQueryResult<IUser>(resp);
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (payload: { id: string; data: Partial<IUser> }) =>
      updateUser(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });
};
