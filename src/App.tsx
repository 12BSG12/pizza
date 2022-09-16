import { Home } from './pages/Home';
import { Header } from './components/Header/Header';
import './scss/app.scss';
import { Cart } from './pages/Cart/Cart';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { PizzaInfo } from './pages/PizzaInfo';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/hooks';
import { useGetCartQuery } from './redux';
import { setAllCount } from './redux/reducers/cart';

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
        <Routes>
          <Route path="/" element={<Home cart={data} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza_info/:id" element={<PizzaInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
