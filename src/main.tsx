import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AuthContextProvider } from "./components/context/AuthContext.tsx";
import App from "./App.tsx";
import theme from "./theme.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataContextProvider } from "./components/context/DataContext.tsx";
import { AccountContextProvider } from "./components/context/AccountContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <DataContextProvider>
            <AccountContextProvider>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </AccountContextProvider>
          </DataContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
