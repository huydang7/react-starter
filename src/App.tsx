import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "moment/locale/vi";
import "./App.less";
import ErrorBoundary from "./containers/ErrorBoundary";
import InitState from "./containers/InitState";
import AppRoute from "./routes/AppRoute";
import "./styles/index.scss";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <InitState />
          <AppRoute />
        </ErrorBoundary>
      </QueryClientProvider>
    </div>
  );
}

export default App;
