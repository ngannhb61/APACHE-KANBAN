const TOKEN_KEY = 'token';

const isLogin = () => {
  return true;
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return "auto-scheduling";
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };
