import { createContext, useState } from "react";

const defaultState = {
  token: null,
  setToken: () => null,
};

export const loginContext = createContext(defaultState);

export const UserProvider = ({ children }) => {
  // check if the login process has successfully completed, in case of success the token must be truthy
    const [token, setToken] = useState(null);
    console.log(token, "token");
  const isLoggedIn = !!token;
  const value = { token, setToken, isLoggedIn };

  return (
    <loginContext.Provider value={value}>{children}</loginContext.Provider>
  );
};
