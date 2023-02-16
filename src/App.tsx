import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "containers/ErrorBoundary";
import InitState from "containers/InitState";
import AppRoute from "routes";
import "styles/index.scss";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import LoadingScreen from "components/LoadingScreen";
import { theme } from "shared/theme";

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <InitState>
              <BrowserRouter>
                <AppRoute />
              </BrowserRouter>
            </InitState>
          </ErrorBoundary>
        </QueryClientProvider>
      </ConfigProvider>
    </Suspense>
  );
}

export default App;
