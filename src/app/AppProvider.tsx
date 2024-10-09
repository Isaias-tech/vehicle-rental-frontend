import { MainErrorFallback } from '../components/errors/MainErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, ReactNode } from 'react';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      <ErrorBoundary fallback={<MainErrorFallback />}>
        <HelmetProvider>{children}</HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AppProvider;
