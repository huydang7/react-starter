import { store } from "../rematch/store";

export const logOut = () => {
  store.dispatch.auth.logOut();
};
