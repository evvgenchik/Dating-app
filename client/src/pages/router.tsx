import { Route, Routes } from 'react-router-dom';
import pagesData from './pagesData';
import { routerType } from '../utils/types';

const CustomRouter = () => {
  const pageRoutes = pagesData.map(
    ({ path, title, element, index }: routerType) => {
      return <Route key={title} index path={`/${path}`} element={element} />;
    }
  );

  return <Routes>{pageRoutes}</Routes>;
};

export default CustomRouter;
