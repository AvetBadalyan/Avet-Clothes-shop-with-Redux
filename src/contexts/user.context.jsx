import { createContext, useMemo } from "react";

export const loginContext = createContext();

export const UserProvider = ({ children }) => {
  // check if the login process has successfully completed, in case of success the token must be truthy
  const userData = useMemo(() => {
    return {
      token: null,
      userCart: [],
      balance: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      isLoggedIn: false,
    };
  }, []);

  return (
    <loginContext.Provider value={[userData]}>{children}</loginContext.Provider>
  );
};
