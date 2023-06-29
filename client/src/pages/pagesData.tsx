import About from './About/About';
import Home from './Home/Home';
import Match from './Match/Match';
import NotFound from './Error/NotFound';
import MainLayout from '../layouts/MainLayout';
import styles from './App.module.scss';
import SignUp from './SignUp/SignUp';
import { routerType } from '../utils/types';

const pagesData: routerType[] = [
  {
    path: '',
    element: <Home />,
    title: 'home',
  },
  {
    path: 'signup',
    element: <SignUp />,
    title: 'SignUp',
  },
  {
    path: 'app',
    element: <MainLayout />,
    title: 'MainLayout',
  },
  {
    path: 'app',
    element: <Match />,
    title: 'Match',
    index: true,
  },
  {
    path: 'app/about',
    element: <About />,
    title: 'about',
  },
  {
    path: 'app/*',
    element: <NotFound />,
    title: 'NotFound',
  },
  {
    path: '*',
    element: <NotFound />,
    title: 'NotFound',
  },
];

<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/signup' element={<SignUp />} />
  <Route path='/app' element={<MainLayout />}>
    <Route index element={<Match />} />
    <Route path='about' element={<About />} />
    <Route path='app/*' element={<NotFound />} />
  </Route>
  <Route path='/*' element={<NotFound />} />
</Routes>;

export default pagesData;
