import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import cl from './App.module.scss';
import { AuthProvider } from './context/authProvider';
import AppRouter from './components/AppRouter/AppRouter';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <div className={cl.app}>
            <AppRouter />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
