import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as AuthService from "./auth-service";

const authWhiteListAPIs = ["/auth/login"];

const checkRedirect = (reqUrl: string) => {
  const isInWhiteList = authWhiteListAPIs.find((url: string) =>
    reqUrl.includes(url)
  );
  return !!isInWhiteList;
};

const requestAuthInterceptor = (
  req: AxiosRequestConfig
): AxiosRequestConfig => {
  const token = AuthService.getToken();
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
    !checkRedirect(res?.response?.config?.url)
  ) {
    AuthService.logOut();
  }
  throw res;
};

const responseFulfilledInterceptor = (res: any): AxiosResponse => {
  return res;
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

instance.interceptors.request.use(requestAuthInterceptor);
instance.interceptors.response.use(
  responseFulfilledInterceptor,
  responseRejectInterceptor
);

export default instance;
