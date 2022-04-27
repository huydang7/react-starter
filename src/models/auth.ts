import { createModel } from "@rematch/core";
import { RootModel } from ".";
import {
  checkEmail,
  forgotPassword,
  getMe,
  login,
  register,
  resetPassword,
} from "../apis/auth";

type AuthState = {
  user: any;
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  } | null;
};

export const auth = createModel<RootModel>()({
  state: {
    user: null,
    tokens: null,
  } as AuthState,
  reducers: {
    loginSuccess(state, payload: any) {
      return { ...state, user: payload.user, tokens: payload.tokens };
    },
    getMeSuccess(state, payload: any) {
      return { ...state, user: payload };
    },
    logOut(state) {
      return { ...state, user: null, tokens: null };
    },
  },
  effects: (dispatch) => ({
    async login(payload: any, state) {
      const res = await login(payload);
      if (res) {
        dispatch.auth.loginSuccess(res.data?.result);
      }
    },
    async register(payload: any, state) {
      const cb = payload?.cb;
      delete payload.cb;

      const res = await register(payload);
      if (res) {
        cb && cb(true);
      } else {
        cb && cb(false);
      }
    },
    async getMe() {
      const res = await getMe();
      if (res) {
        dispatch.auth.getMeSuccess(res.data?.result);
      }
    },
    async checkEmail(payload: any) {
      const cb = payload?.cb;
      delete payload.cb;
      const res = await checkEmail(payload);
      if (res) {
        cb && cb(res.data.result);
      } else {
        cb && cb(false);
      }
    },
    async forgotPassword(payload: any) {
      await forgotPassword(payload);
    },
    async resetPassword(payload: any) {
      await resetPassword(payload);
    },
  }),
});
