import { PropsWithChildren, createContext, useMemo, useState } from "react";

type CategoriesExpense = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
};
type CategoriesExpenseType = {
  categoriesExpense: CategoriesExpense[];
  setCategoriesExpense: (CategoriesExpense: CategoriesExpense[]) => void;
};

export const CategoriesExpenseContext = createContext<CategoriesExpenseType>({
  categoriesExpense: [
    {
      id: "",
      name: "",
      userId: "",
      createdAt: "",
      deletedAt: "",
      updatedAt: "",
    },
  ],
  setCategoriesExpense: (_categoriesExpense: CategoriesExpense[]) => {},
});

export const CategoriesExpenseContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [categoriesExpense, setCategoriesExpense] = useState<
    CategoriesExpense[]
  >([]);

  const value = useMemo(
    () => ({ categoriesExpense, setCategoriesExpense }),
    [categoriesExpense, setCategoriesExpense]
  );
  return (
    <CategoriesExpenseContext.Provider value={value}>
      {children}
    </CategoriesExpenseContext.Provider>
  );
};
