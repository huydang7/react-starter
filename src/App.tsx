import React from "react";
import "./styles/index.scss";
import "./App.scss";
import AppRoute from "./routes/AppRoute";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./rematch/store";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <ChakraProvider>
          <AppRoute />
        </ChakraProvider>
      </Provider>
    </div>
  );
}

export default App;
