import { Home } from './pages/Home';
import { Header } from './components/Header/Header';
import './scss/app.scss';
import { Cart } from './pages/Cart/Cart';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
