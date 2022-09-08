import '../../scss/app.scss';
import emptyCart from '../../assets/img/empty-cart.png'
import { Link } from 'react-router-dom';
import { setIsSwitched } from '../../redux/reducers/header';
import { useAppDispatch } from '../../hooks/hooks';

export const CartEmpty = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.<br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={emptyCart} alt="Empty cart" />
      <Link to="/" className="button button--black" onClick={() => dispatch(setIsSwitched(true))}>
        <span>Вернуться назад</span>
      </Link>
    </div>
  )
}
