import { createContext, useState } from "react";

export const loginContext = createContext();

export const UserProvider = ({ children }) => {
  // check if the login process has successfully completed, in case of success the token must be truthy
  const [token, setToken] = useState(null);
  const isLoggedIn = !!token;

  return (
    <loginContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};
