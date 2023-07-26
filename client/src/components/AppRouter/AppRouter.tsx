import { useRoutes, Navigate } from 'react-router-dom';
import About from '@/pages/About/About';
import Home from '@/pages/Home/Home';
import Match from '@/pages/Match/Match';
import NotFound from '@/pages/Error/NotFound';
import MainLayout from '@/layouts/MainLayout';
import SignUp from '@/pages/SignUp/SignUp';
import useAuth from '@/hooks/useAuth';
import Swiper from '../MainDisplayMatch/Swiper/Swiper';
import ChatDisplay from '../MainDisplayMatch/Chat/ChatDisplay/ChatDisplay';
import ChatPersonInfo from '../MainDisplayMatch/Chat/ChatPersonInfo/ChatPersonInfo';
import Profile from '@/pages/Profile/Profile';

const AppRouter = () => {
  const { user } = useAuth();

  const basicRoutes = [
    {
      path: '',
      element: <Home />,
    },
    {
      path: 'signup',
      element: <SignUp />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  const privateRoutes = useRoutes([
    ...basicRoutes,
    {
      path: 'app',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Match />,
          children: [
            {
              path: '',
              element: <Swiper />,
            },
            {
              path: 'message/:id',
              element: (
                <>
                  <ChatDisplay />
                  <ChatPersonInfo />
                </>
              ),
            },
          ],
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'app/*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  const publicRoutes = useRoutes([
    ...basicRoutes,
    {
      path: 'app',
      element: <Navigate to='../' />,
      children: [
        {
          path: 'message/:id',
          element: <Navigate to='../' />,
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
  ]);

  return user ? privateRoutes : publicRoutes;
};

export default AppRouter;
