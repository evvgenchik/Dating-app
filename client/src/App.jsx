import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Match from './pages/Match/Match';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import styles from './App.module.scss';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/app' element={<MainLayout />}>
            <Route index element={<Match />} />
            <Route path='about' element={<About />} />
            <Route path='app/*' element={<NotFound />} />
          </Route>
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
