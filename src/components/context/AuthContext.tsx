import React, { createContext, useMemo, useState } from "react";

interface Auth {
  email: string;
  password: string;
  accessToken: string;
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<AuthContextType["auth"]>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [auth, setAuth] = useState<AuthContextType["auth"]>({
    email: "string",
    password: "string",
    accessToken: "string",
  });

  const value = useMemo(() => ({ auth, setAuth }), [auth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
