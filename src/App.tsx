import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'containers/ErrorBoundary';
import InitState from 'containers/InitState';
import AppRoute from 'routes';

import LoadingScreen from 'components/LoadingScreen';
import ThemeWrapper from 'components/ThemeWrapper';

import 'styles/index.scss';
import 'antd/dist/reset.css';

const queryClient = new QueryClient();

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ThemeWrapper>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <InitState>
              <BrowserRouter>
                <AppRoute />
              </BrowserRouter>
            </InitState>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeWrapper>
    </Suspense>
  );
}

export default App;
