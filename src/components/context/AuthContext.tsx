import { createContext } from "react";
import { auth } from "./auth";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext(auth);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
