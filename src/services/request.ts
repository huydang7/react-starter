import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthStore } from "../stores/auth";

import * as AuthService from "./auth-service";
import { configs } from "./config";

const authWhiteListAPIs = ["/auth/login"];

const shouldRedirectFrom = (reqUrl: string) => {
  const isInWhiteList = authWhiteListAPIs.find((url: string) =>
    reqUrl.includes(url)
  );
  return !isInWhiteList;
};

const requestAuthInterceptor = (
  req: AxiosRequestConfig
): AxiosRequestConfig => {
  const token = useAuthStore.getState().tokens?.access.token;
  if (token) {
    return {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return req;
};

const responseRejectInterceptor = (res: any): AxiosResponse => {
  if (
    res.response?.status === 401 &&
    shouldRedirectFrom(res?.response?.config?.url)
  ) {
    AuthService.logOut();
  }
  throw res;
};

const responseFulfilledInterceptor = (res: any): AxiosResponse => {
  return res;
};

const instance = axios.create({
  baseURL: configs.apiURL,
});

instance.interceptors.request.use(requestAuthInterceptor);
instance.interceptors.response.use(
  responseFulfilledInterceptor,
  responseRejectInterceptor
);

export default instance;
