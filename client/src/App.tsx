import { BrowserRouter } from 'react-router-dom';
import cl from './App.module.scss';
import { AuthProvider } from './context/authProvider';
import AppRouter from './components/AppRouter/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className={cl.app}>
          <AppRouter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
