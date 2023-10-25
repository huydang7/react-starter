import { useMutation, useQuery } from '@tanstack/react-query';

import { checkEmail, forgotPassword, getMe, login, register, resetPassword } from '@/apis/auth';
import { prettifyQueryResult } from '@/shared/utils';
import { useAuthStore } from '@/stores/auth';

export const useQueryGetMe = () => {
  const { setUser } = useAuthStore();

  const resp = useQuery({
    queryKey: ['getMe'],
    queryFn: () => getMe(),
    enabled: !!useAuthStore.getState().tokens,
  });

  const data = prettifyQueryResult(resp);
  if (data.result) {
    setUser(data.result);
  }
};

export const useLogin = () => {
  const { setUserAndTokens } = useAuthStore();
  return useMutation({
    mutationFn: login,
    onSuccess: ({ data, status }) => {
      if (status === 200 && data.result) {
        setUserAndTokens(data.result);
      }
    },
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useForgotPassword = () => {
  return useMutation({ mutationFn: forgotPassword });
};

export const useResetPassword = () => {
  return useMutation({ mutationFn: resetPassword });
};

export const useCheckEmail = () => {
  return useMutation({ mutationFn: checkEmail });
};
