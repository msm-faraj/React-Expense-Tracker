import { useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import expenseTable from "./data/expenses";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Transaction from "./components/transaction/Transaction";

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
    <>
      {/* Topbar */}
      <Box p={p}>
        <TopBar
          onShowSignIn={handleShowSignIn}
          onShowSignUp={handleShowSignUp}
        ></TopBar>
      </Box>
      {/* Routes */}
      <Routes>
        <Route
          // SignUp Form
          path="/"
          element={
            <HStack align={"center"} justify={"center"}>
              <Box p={p} width={"450px"} mt={24}>
                <SignUp></SignUp>
              </Box>
            </HStack>
          }
        ></Route>
        <Route
          // SignIn Form
          path="/api/login"
          element={
            <HStack align={"center"} justify={"center"}>
              <Box p={p} width={"450px"} mt={24}>
                {showSignIn === true && <SignIn></SignIn>}
              </Box>
            </HStack>
          }
        ></Route>
        <Route
          // Home page
          path="/api/home"
          element={
            <>
              <Transaction />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
