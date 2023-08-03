import { useMutation, useQuery } from '@tanstack/react-query';
import { checkEmail, forgotPassword, getMe, login, register, resetPassword } from 'apis/auth';
import { useAuthStore } from 'stores/auth';

export const useGetMe = () => {
  const { setUser } = useAuthStore();
  return useQuery(['getMe'], () => getMe(), {
    enabled: false,
    onSuccess: ({ data, status }) => {
      if (status === 200 && data.result) {
        setUser(data.result);
      }
    },
  });
};

export const useLogin = () => {
  const { setUserAndTokens } = useAuthStore();
  return useMutation(login, {
    onSuccess: ({ data, status }) => {
      if (status === 200 && data.result) {
        setUserAndTokens(data.result);
      }
    },
  });
};

export const useRegister = () => {
  return useMutation(register);
};

export const useForgotPassword = () => {
  return useMutation(forgotPassword);
};

export const useResetPassword = () => {
  return useMutation(resetPassword);
};

export const useCheckEmail = () => {
  return useMutation(checkEmail);
};
