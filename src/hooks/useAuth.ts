import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkEmail,
  forgotPassword,
  getMe,
  login,
  register,
  resetPassword,
} from "apis/auth";
import { useAuthStore } from "stores/auth";

export const useQueryGetMe = () => {
  const { setUser } = useAuthStore();
  const resp = useQuery(["getMe"], () => getMe(), {
    refetchOnWindowFocus: false,
    onSuccess: ({ data, status }) => {
      if (status === 200 && data.result) {
        setUser(data.result);
      }
    },
    enabled: false,
    retry: false,
  });
  return resp;
};

export const useLoginMutation = () => {
  const { loginSuccess } = useAuthStore();
  const resp = useMutation(["login"], (payload) => login(payload), {
    onSuccess: ({ data, status }) => {
      if (status === 200 && data.result) {
        loginSuccess(data.result);
      }
    },
  });
  return resp;
};

export const useRegisterMutation = () => {
  const resp = useMutation(["register"], (payload) => register(payload), {
    onSuccess: ({ data, status }, variables: any) => {
      if (status === 200 && data.result) {
        variables?.cb(true);
      }
    },
  });
  return resp;
};

export const useForgotPasswordMutation = () => {
  const resp = useMutation(["forgotPassword"], (payload) =>
    forgotPassword(payload)
  );
  return resp;
};

export const useResetPasswordMutation = () => {
  const resp = useMutation(["resetPassword"], (payload: any) =>
    resetPassword(payload)
  );
  return resp;
};

export const useCheckEmailMutation = () => {
  const resp = useMutation(
    ["checkEmail"],
    (payload: any) => checkEmail({ email: payload?.email }),
    {
      onSuccess: ({ data, status }, variables: any) => {
        if (status === 200 && data.result) {
          variables?.cb(data.result);
        }
      },
    }
  );
  return resp;
};
