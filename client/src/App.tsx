import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Match from './pages/Match/Match';
import NotFound from './pages/Error/NotFound';
import MainLayout from './layouts/MainLayout';
import styles from './App.module.scss';
import SignUp from './pages/SignUp/SignUp';
import CustomRouter from './pages/router';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <CustomRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
