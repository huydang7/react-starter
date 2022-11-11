import produce from "immer";
import create, { StateCreator } from "zustand";
import { IUser } from "../interfaces/user";
import { persist } from "zustand/middleware";

export type AuthState = {
  isAuthenticated: boolean;
  currentUser: null | IUser;
  tokens: any;
  loginSuccess: (payload: { user: IUser; tokens: any }) => void;
  setUser: (user: IUser) => void;
  logOut: () => void;
};

export const store: StateCreator<AuthState> = (set: Function) => ({
  isAuthenticated: false,
  currentUser: null,
  tokens: null,
  loginSuccess: (payload: { user: IUser; tokens: any }) =>
    set(
      produce((state: AuthState) => {
        state.isAuthenticated = true;
        state.currentUser = payload.user;
        state.tokens = payload.tokens;
      })
    ),
  setUser: (user: IUser) =>
    set(
      produce((state: AuthState) => {
        state.isAuthenticated = true;
        state.currentUser = user;
      })
    ),
  logOut: () =>
    set(
      produce((state: AuthState) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.tokens = null;
      })
    ),
});

export const useAuthStore = create<AuthState>()(
  persist(store, {
    name: "auth-storage",
    getStorage: () => localStorage,
  })
);
