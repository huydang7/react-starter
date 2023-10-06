import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

export type ThemeState = {
  darkMode: boolean;
};

export type ThemeAction = {
  toggleTheme: () => void;
};

export const store = immer<ThemeState & ThemeAction>((set) => ({
  darkMode: false,

  toggleTheme: () =>
    set((state: ThemeState) => {
      state.darkMode = !state.darkMode;
    }),
}));

export const useThemeStore = createWithEqualityFn<ThemeState & ThemeAction>()(
  persist(store, {
    name: 'theme-storage',
    storage: createJSONStorage(() => localStorage),
  })
);
