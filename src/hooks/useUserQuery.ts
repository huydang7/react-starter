import { useMutation, useQuery } from '@tanstack/react-query';
import { createUser, deleteUser, getUser, getUsers, updateUser } from 'apis/user';
import { IGetUsersQuery, IUser } from 'interfaces/user';
import { prettifyQueryManyResult, prettifyQueryResult, queryClient } from 'shared/utils';

export const useGetUsers = (query: IGetUsersQuery) => {
  const result = useQuery(['getUsers', query], () => getUsers(query), {
    refetchOnWindowFocus: false,
    retry: false,
  });
  return prettifyQueryManyResult<IUser>(result);
};

export const useGetUser = (id: string) => {
  const result = useQuery(['getUser', id], () => getUser(id), {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false,
  });
  return prettifyQueryResult<IUser>(result);
};

export const useCreateUser = () => {
  return useMutation(createUser, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });
};

export const useUpdateUser = () => {
  return useMutation(
    (payload: { id: string; data: Partial<IUser> }) => updateUser(payload.id, payload.data),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['getUsers'] });
      },
    }
  );
};

export const useDeteleUser = () => {
  return useMutation(deleteUser, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });
};
