import React from "react";
import "./styles/index.scss";
import "./App.less";
import AppRoute from "./routes/AppRoute";
import { Provider } from "react-redux";
import { store } from "./rematch/store";
import InitState from "./containers/InitState";
import ErrorBoundary from "./containers/ErrorBoundary";
import "moment/locale/vi";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";

const persistor = getPersistor();

function App() {
  return (
    <PersistGate persistor={persistor}>
      <div className="app">
        <ErrorBoundary>
          <Provider store={store}>
            <InitState />
            <AppRoute />
          </Provider>
        </ErrorBoundary>
      </div>
    </PersistGate>
  );
}

export default App;
