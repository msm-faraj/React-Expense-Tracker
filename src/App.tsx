import { Box, HStack } from "@chakra-ui/react";
import TopBar from "./components/topbar/TopBar";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/home/Home";

function App() {
  const p = 4;

  return (
    <>
      {/* Topbar */}
      <Box pb={5} position="relative" top={0} right={0} w={"100%"}>
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
          element={<Home />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
