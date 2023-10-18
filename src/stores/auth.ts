import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import { AuthTokenInfo } from '@/interfaces/token';
import { IUser } from '@/interfaces/user';

export type AuthState = {
  currentUser: IUser | null;
  tokens: AuthTokenInfo | null;
  _hydrated: boolean;
};

export type AuthAction = {
  setUserAndTokens: (payload: { user: IUser; tokens: AuthTokenInfo }) => void;
  setUser: (user: IUser) => void;
  logOut: () => void;
  _setHydrated: (state: boolean) => void;
};

export const store = immer<AuthState & AuthAction>((set) => ({
  currentUser: null,
  tokens: null,
  _hydrated: false,
  setUserAndTokens: (payload: { user: IUser; tokens: AuthTokenInfo }) =>
    set((state: AuthState) => {
      state.currentUser = payload.user;
      state.tokens = payload.tokens;
    }),
  setUser: (user: IUser) =>
    set((state: AuthState) => {
      state.currentUser = user;
    }),
  logOut: () =>
    set((state: AuthState) => {
      state.currentUser = null;
      state.tokens = null;
    }),
  _setHydrated: (value: boolean) => {
    set((state: AuthState) => {
      state._hydrated = value;
    });
  },
}));

export const useAuthStore = createWithEqualityFn<AuthState & AuthAction>()(
  persist(store, {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage() {
      return (state, error) => {
        if (error) {
          console.log('an error happened during hydration', error);
        } else {
          state?._setHydrated(true);
        }
      };
    },
  })
);
