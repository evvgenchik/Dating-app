import { useRoutes, Navigate } from 'react-router-dom';
import About from '../../pages/About/About';
import Home from '../../pages/Home/Home';
import Match from '../../pages/Match/Match';
import NotFound from '../../pages/Error/NotFound';
import MainLayout from '../../layouts/MainLayout';
import SignUp from '../../pages/SignUp/SignUp';
import useAuth from '../hooks/useAuth';

const AppRouter = () => {
  const { user } = useAuth();

  const privateRoutes = useRoutes([
    {
      path: '',
      element: <Home />,
    },
    {
      path: 'signup',
      element: <SignUp />,
    },
    {
      path: 'app',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Match />,
          index: true,
        },
        {
          path: 'app/about',
          element: <About />,
        },
        {
          path: 'app/*',
          element: <NotFound />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  const publicRoutes = useRoutes([
    {
      path: '',
      element: <Home />,
    },
    {
      path: 'signup',
      element: <SignUp />,
    },
    {
      path: 'app',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to='/' />,
          index: true,
        },
        {
          path: 'app/about',
          element: <About />,
        },
        {
          path: 'app/*',
          element: <NotFound />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return user ? privateRoutes : publicRoutes;
};

export default AppRouter;
