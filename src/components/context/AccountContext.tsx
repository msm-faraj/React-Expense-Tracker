import { PropsWithChildren, createContext, useMemo, useState } from "react";

type Account = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
};
type AccountContextType = {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
};

export const AccountContext = createContext<AccountContextType>({
  accounts: [
    {
      id: "1",
      name: "name1",
      userId: "id1",
      createdAt: "01",
      deletedAt: "001",
      updatedAt: "0001",
    },
  ],
  setAccounts: (_accounts: Account[]) => {},
});

export const AccountContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const value = useMemo(
    () => ({ accounts, setAccounts }),
    [accounts, setAccounts]
  );
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
