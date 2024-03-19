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
      id: "",
      name: "",
      userId: "",
      createdAt: "",
      deletedAt: "",
      updatedAt: "",
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
