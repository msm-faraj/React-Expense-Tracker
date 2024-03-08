import { useState } from "react";
import { ExpenceTable } from "./components/ExpenseTable";
import { Box, HStack } from "@chakra-ui/react";
import { ExpenseForm } from "./components/ExpenseForm";
import expenseTable from "./data/expenses";
import LoginForm from "./components/LoginForm";
import TopBar from "./components/TopBar";

interface Expense {
  // userId: number;
  id: number;
  time: string;
  note: string;
  amount: number;
  account: string;
  category: string;
  description: string;
  // deletedAt: Date;
  // category: {
  //   id: number;
  //   name: string;
  // };
  // account: {
  //   id: number;
  //   name: string;
  // };
}
function App() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState(expenseTable);

  const handleShowSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const visibleExpenses = expenses.filter((e) => {
    if (selectedAccount && selectedCategory) {
      return e.account === selectedAccount && e.category === selectedCategory;
    } else if (selectedAccount) {
      return e.account === selectedAccount;
    } else if (selectedCategory) {
      return e.category === selectedCategory;
    } else return expenses;
  });

  const p = 4;

  return (
    <Box width={"100%"} p={3}>
      <Box p={p}>
        <TopBar onShowSignIn={handleShowSignIn}></TopBar>
      </Box>
      <HStack align={"center"} justify={"center"}>
        {/* Expense Form */}
        <Box p={p} width={"45%"}>
          <ExpenseForm
            onSubmit={(newExpense) =>
              setExpenses([
                ...expenses,
                { ...newExpense, id: expenses.length + 1 },
              ])
            }
          ></ExpenseForm>
        </Box>
        {/* SignIn Form */}
        <Box p={p} width={"45%"}>
          {showSignIn === true && <LoginForm></LoginForm>}
        </Box>
      </HStack>

      <Box p={p}>
        <ExpenceTable
          expenses={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
          onSelectCategory={(category) => setSelectedCategory(category)}
          onSelectedAccount={(account) => setSelectedAccount(account)}
        ></ExpenceTable>
      </Box>
    </Box>
  );
}

export default App;
