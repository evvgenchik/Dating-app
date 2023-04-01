import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import styles from './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
