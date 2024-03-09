import { useState } from "react";
import { ExpenceTable } from "./components/ExpenseTable";
import { Box, HStack } from "@chakra-ui/react";
import { ExpenseForm } from "./components/ExpenseForm";
import expenseTable from "./data/expenses";
import SignInForm from "./components/SignInForm";
import TopBar from "./components/TopBar";
import SignUpForm from "./components/SignUpForm";

function App() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState(expenseTable);

  const handleShowSignIn = () => {
    setShowSignIn(!showSignIn);
  };
  const handleShowSignUp = () => {
    setShowSignUp(!showSignUp);
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
        <TopBar
          onShowSignIn={handleShowSignIn}
          onShowSignUp={handleShowSignUp}
        ></TopBar>
      </Box>
      <HStack align={"center"} justify={"center"}>
        {/* SignUn Form */}
        <Box p={p} width={"65%"}>
          {showSignUp === true && <SignUpForm></SignUpForm>}
        </Box>
      </HStack>
      <HStack align={"center"} justify={"center"}>
        {/* SignIn Form */}
        <Box p={p} width={"65%"}>
          {showSignIn === true && <SignInForm></SignInForm>}
        </Box>
      </HStack>

      <HStack align={"center"} justify={"center"}>
        {/* Expense Form */}
        <Box p={p} width={"65%"}>
          <ExpenseForm
            onSubmit={(newExpense) =>
              setExpenses([
                ...expenses,
                { ...newExpense, id: expenses.length + 1 },
              ])
            }
          ></ExpenseForm>
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
