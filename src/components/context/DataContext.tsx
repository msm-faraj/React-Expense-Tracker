import { PropsWithChildren, createContext, useMemo, useState } from "react";

type Data = {
  id: string;
  name: string;
  userId: string;
};

export const DataContext = createContext({
  data: {
    id: "",
    name: "",
    userId: "",
  },
  setData: (_data: Data) => {},
});

export const DataContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [data, setData] = useState<Data>({
    id: "",
    name: "",
    userId: "",
  });

  const value = useMemo(() => ({ data, setData }), [data, setData]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
