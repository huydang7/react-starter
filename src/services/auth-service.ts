enum StorageKey {
  TOKEN = "token",
  REFRESH_TOKEN = "refresh_token",
}

export const saveToken = (token: string) => {
  localStorage.setItem(StorageKey.TOKEN, token);
};

export const getToken = () => localStorage.getItem(StorageKey.TOKEN);

export const removeToken = () => localStorage.removeItem(StorageKey.TOKEN);

export const isLoggedIn = () => {
  return !!localStorage.getItem(StorageKey.TOKEN);
};

export const cleanLocalStorage = () => {
  removeToken();
};

export const logOut = () => {
  removeToken();
  window.location.href = "/";
};
