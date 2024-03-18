import { PropsWithChildren, createContext, useMemo, useState } from "react";

type CategoriesIncome = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
};
type CategoriesIncomeType = {
  categoriesIncome: CategoriesIncome[];
  setCategoriesIncome: (CategoriesIncome: CategoriesIncome[]) => void;
};

export const CategoriesIncomeContext = createContext<CategoriesIncomeType>({
  categoriesIncome: [
    {
      id: "1",
      name: "name1",
      userId: "id1",
      createdAt: "01",
      deletedAt: "001",
      updatedAt: "0001",
    },
  ],
  setCategoriesIncome: (_categoriesIncome: CategoriesIncome[]) => {},
});

export const CategoriesIncomeContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [categoriesIncome, setCategoriesIncome] = useState<CategoriesIncome[]>(
    []
  );

  const value = useMemo(
    () => ({ categoriesIncome, setCategoriesIncome }),
    [categoriesIncome, setCategoriesIncome]
  );
  return (
    <CategoriesIncomeContext.Provider value={value}>
      {children}
    </CategoriesIncomeContext.Provider>
  );
};
