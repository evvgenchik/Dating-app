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
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="app/about" element={<About />} />
            <Route path="app/*" element={<NotFound />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
