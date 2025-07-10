import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RouterProvider, useRouter } from './components/Router';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { HomePage, LoginPage, SignupPage, StreamPage, Profile, DevelopedBy } from './pages';

const AppContent = () => {
  const { currentRoute, routeParams } = useRouter();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        {currentRoute === '/' && <HomePage />}
        {currentRoute === '/login' && <LoginPage />}
        {currentRoute === '/signup' && <SignupPage />}
        {currentRoute === '/stream/:streamId' && <StreamPage />}
        {currentRoute === '/profile/:userId' && <Profile />}
        {currentRoute === '/developed-by' && <DevelopedBy />}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </RouterProvider>
    </ErrorBoundary>
  );
};

export default App;