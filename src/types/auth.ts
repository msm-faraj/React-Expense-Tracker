export interface Auth {
  email: string;
  password: string;
  accessToken: string;
}

export type AuthContextType = {
  auth: Auth;
  setAuth: (user: Auth) => void;
};
