import { createContext, useMemo, useState } from "react";

export const loginContext = createContext();

export const UserProvider = ({ children }) => {
  // check if the login process has successfully completed, in case of success the token must be truthy
  const [token, setToken] = useState(null);
  const isLoggedIn = !!token;

  // const userData = useMemo(() => {
  //   return {
  //     token: null,
  //     userCart: [],
  //     balance: "",
  //     email: "",
  //     firstName: "",
  //     lastName: "",
  //     password: "",
  //     isLoggedIn: false,
  //   };
  // }, []);

  return (
    <loginContext.Provider value={{token, setToken, isLoggedIn}}>{children}</loginContext.Provider>
  );
};
