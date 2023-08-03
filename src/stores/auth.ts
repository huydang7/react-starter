import produce from 'immer';
import { AuthTokenInfo } from 'interfaces/token';
import { IUser } from 'interfaces/user';
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthState = {
  currentUser: null | IUser;
  tokens: AuthTokenInfo | null;
  setUserAndTokens: (payload: { user: IUser; tokens: AuthTokenInfo }) => void;
  setUser: (user: IUser) => void;
  logOut: () => void;
};

export const store: StateCreator<AuthState> = (set) => ({
  currentUser: null,
  tokens: null,
  setUserAndTokens: (payload: { user: IUser; tokens: AuthTokenInfo }) =>
    set(
      produce((state: AuthState) => {
        state.currentUser = payload.user;
        state.tokens = payload.tokens;
      })
    ),
  setUser: (user: IUser) =>
    set(
      produce((state: AuthState) => {
        state.currentUser = user;
      })
    ),
  logOut: () =>
    set(
      produce((state: AuthState) => {
        state.currentUser = null;
        state.tokens = null;
      })
    ),
});

export const useAuthStore = create<AuthState>()(
  persist(store, {
    name: 'auth-storage',
    getStorage: () => localStorage,
  })
);
