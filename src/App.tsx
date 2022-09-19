import { Home } from './pages/Home';
import { Header } from './components/Header/Header';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/hooks';
import { useGetCartQuery } from './redux';
import { setAllCount } from './redux/reducers/cart';
import { Suspense, lazy } from 'react';
import ThreeDots from './components/common/Preloader';

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
    <div className="wrapper">
      <Header />
      <div className="content">
        <Suspense fallback={<ThreeDots />}>
          <Routes>
            <Route path="/" element={<Home cart={data} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza_info/:id" element={<PizzaInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};
