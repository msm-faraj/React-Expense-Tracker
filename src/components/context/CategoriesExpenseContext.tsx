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
  setCategoriesExpense: function (
    _CategoriesExpense: CategoriesExpense[]
  ): void {
    throw new Error("Function not implemented.");
  },
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
