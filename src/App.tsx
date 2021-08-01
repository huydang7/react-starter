import React from "react";
import "./styles/index.scss";
import "./App.scss";
import AppRoute from "./routes/AppRoute";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="app">
      <ChakraProvider>
        <AppRoute />
      </ChakraProvider>
    </div>
  );
}

export default App;
