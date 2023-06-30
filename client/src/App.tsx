import { BrowserRouter } from 'react-router-dom';
import cl from './App.module.scss';

import AppRouter from './components/AppRouter/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <div className={cl.app}>
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
