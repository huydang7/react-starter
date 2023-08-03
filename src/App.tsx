import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import ErrorBoundary from 'containers/ErrorBoundary';
import InitState from 'containers/InitState';
import AppRoute from 'routes';
import { theme } from 'shared/theme';

import LoadingScreen from 'components/LoadingScreen';

import 'styles/index.scss';
import 'antd/dist/reset.css';

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
