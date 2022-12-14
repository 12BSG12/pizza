import '../../scss/app.scss';
import logo from '../../assets/img/pizza-logo.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setSearchText } from '../../redux/reducers/sort';
import { Link, useLocation } from 'react-router-dom';
import { useSetPizzaInfoMutation, useSetUserMutation } from '../../redux';
import { useAuth } from '../../hooks/auth';
import { Auth } from '../auth/Auth';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import searchClear from '../../assets/img/search-clear.svg';
import debounce from 'lodash.debounce';
import { setCurrentPage, setIdAndTitle } from '../../redux/reducers/sort';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [setPizzaInfo] = useSetPizzaInfoMutation();
  const [removeUser] = useSetUserMutation();
  const { isAuth } = useAuth();
  const location = useLocation();

  const { searchText } = useAppSelector((state) => state.sort);
  const { allCount, allSum } = useAppSelector((state) => state.cart);
  const [value, setValue] = useState(searchText);

  const handleDelPizzaInfo = async () => {
    await setPizzaInfo({ title: null, imageUrl: null, price: 0, info: null }).unwrap();
  };

  const [open, setOpenForm] = useState<boolean>(false);
  const openForm = () => {
    setOpenForm(true);
  };
  const closeForm = () => {
    setOpenForm(false);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClickSearchClear = () => {
    setValue('');
    updateSearchValue('');
    inputRef.current?.focus();
  };

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentPage(1));
    dispatch(setIdAndTitle({ catID: 0, title: 'Все' }));
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchText(value));
    }, 250),
    [dispatch],
  );

  return (
    <>
      <div className="header">
        <div className="container">
          <Link to="/" onClick={handleDelPizzaInfo}>
            <div className="header__logo">
              <img width="38" src={logo} alt="Pizza logo" />
              <div>
                <h1>React Pizza</h1>
                <p>самая вкусная пицца во вселенной</p>
              </div>
            </div>
          </Link>
          {location.pathname !== '/cart' && (
            <>
              <div className="header__search">
                <svg
                  enableBackground="new 0 0 32 32"
                  id="EditableLine"
                  version="1.1"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"></circle>
                  <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"></line>
                </svg>
                <input
                  placeholder="Поиск пиццы..."
                  ref={inputRef}
                  value={value}
                  onChange={handleOnChangeSearch}
                />
                {value && (
                  <img
                    className="header__searchClear"
                    src={searchClear}
                    alt="clear"
                    onClick={onClickSearchClear}
                  />
                )}
              </div>
              <div className="header__cart">
                <Link to="/cart" className="button button--cart">
                  <span>{allSum} ₽</span>
                  <div className="button__delimiter"></div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{allCount}</span>
                </Link>
              </div>
            </>
          )}
          {isAuth ? (
            <span
              className="auth"
              onClick={() => removeUser({ id: null, email: null, token: null })}>
              Log Out
            </span>
          ) : (
            <span className="auth" onClick={openForm}>
              Log in
            </span>
          )}
        </div>
      </div>
      {!isAuth && <Auth openPay={open} closePayForm={closeForm} />}
    </>
  );
};
