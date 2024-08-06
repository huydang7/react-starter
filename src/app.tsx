import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import LoadingScreen from '@/components/loading-screen';
import ErrorBoundary from '@/containers/error-boundary';
import InitState from '@/containers/init-state';
import ThemeWrapper from '@/containers/theme-wrapper';
import AppRoute from '@/routes';

import { queryClient } from './shared/utils';

import '@/styles/index.scss';
import 'antd/dist/reset.css';

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
