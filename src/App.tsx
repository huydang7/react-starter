import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import LoadingScreen from '@/components/LoadingScreen';
import ErrorBoundary from '@/containers/ErrorBoundary';
import InitState from '@/containers/InitState';
import ThemeWrapper from '@/containers/ThemeWrapper';
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
