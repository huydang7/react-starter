import { useAuthStore } from 'stores/auth';

export const logOut = () => {
  useAuthStore.getState().logOut();
};
