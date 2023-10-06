import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, deleteUser, getUser, getUsers, updateUser } from 'apis/user';
import { IGetUsersQuery, IUser } from 'interfaces/user';
import { prettifyQueryManyResult, prettifyQueryResult } from 'shared/utils';

export const useGetUsers = (query: IGetUsersQuery) => {
  const result = useQuery(['getUsers', query], () => getUsers(query), {
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  });
  return prettifyQueryManyResult<IUser>(result);
};

export const useGetUser = (id: string) => {
  const result = useQuery(['getUser', id], () => getUser(id), {
    refetchOnWindowFocus: false,
    retry: false,
  });
  return prettifyQueryResult<IUser>(result);
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
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
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
    },
  });
};
