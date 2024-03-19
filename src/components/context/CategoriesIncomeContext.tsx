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
  setCategoriesIncome: function (_CategoriesIncome: CategoriesIncome[]): void {
    throw new Error("Function not implemented.");
  },
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
