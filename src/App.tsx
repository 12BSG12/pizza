import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/hooks';
import { useGetCartQuery } from './redux';
import { setAllCount } from './redux/reducers/cart';
import { Suspense, lazy } from 'react';
import ThreeDots from './components/common/Preloader';
import { Layout } from './components/Layouts/Layout';

const Cart = lazy(() => import('./pages/Cart/Cart'));
const PizzaInfo = lazy(() => import('./pages/PIzzaInfo/PizzaInfo'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const App = () => {
  const dispatch = useAppDispatch();
  const { data = [] } = useGetCartQuery('');

  useEffect(() => {
    dispatch(setAllCount(data));
  }, [dispatch, data]);

  return (
    <Suspense fallback={<ThreeDots />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home cart={data} />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza_info/:id" element={<PizzaInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
