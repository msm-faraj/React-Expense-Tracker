import { Box, HStack } from "@chakra-ui/react";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Transaction from "./components/transaction/Transaction";
import SignIn from "./components/SignIn";

function App() {
  const p = 4;

  return (
    <>
      {/* Topbar */}
      <Box p={p}>
        <TopBar></TopBar>
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
                <SignIn></SignIn>
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
