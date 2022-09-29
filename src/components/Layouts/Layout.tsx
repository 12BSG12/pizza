import { Outlet } from 'react-router-dom';
import '../../scss/app.scss';
import { Header } from '../Header/Header';

export const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
