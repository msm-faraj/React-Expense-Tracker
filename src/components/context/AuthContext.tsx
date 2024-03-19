import { PropsWithChildren, createContext, useMemo, useState } from "react";

type Auth = {
  email: string;
  password: string;
  accessToken: string;
};

export const AuthContext = createContext({
  auth: {
    email: "",
    password: "",
    accessToken: "",
  },
  setAuth: (_auth: Auth) => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [auth, setAuth] = useState<Auth>({
    email: "",
    password: "",
    accessToken: "",
  });

  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
