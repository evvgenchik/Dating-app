import { BrowserRouter } from 'react-router-dom';
import cl from './App.module.scss';
import { AuthProvider } from './context/authProvider';
import AppRouter from './components/AppRouter/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className={cl.app}>
            <AppRouter />
          </div>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
