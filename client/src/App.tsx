import cl from './App.module.scss';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppRouter from './components/AppRouter/AppRouter';
import { AuthProvider } from './context/AuthProvider';

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
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
