import { getPersistor } from "@rematch/persist";
import "moment/locale/vi";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import "./App.less";
import ErrorBoundary from "./containers/ErrorBoundary";
import InitState from "./containers/InitState";
import { store } from "./rematch/store";
import AppRoute from "./routes/AppRoute";
import "./styles/index.scss";

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
