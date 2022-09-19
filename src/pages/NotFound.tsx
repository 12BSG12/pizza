import '../scss/app.scss';
import not from '../assets/img/404.png'
import { Link } from 'react-router-dom';
import { setIsSwitched } from '../redux/reducers/header';
import { useAppDispatch } from '../hooks/hooks';

const NotFound = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="cart cart--empty">
      <h2>Данной страницы не существует 😕</h2>
      <p>
        Вероятней всего, вы перешли по некорректной ссылке.<br />
        Для того, чтобы заказать пиццу, перейдите на главную страницу.
      </p>
      <img src={not} alt="404 NOT FOUND" />
      <Link to="/" className="button button--black" onClick={() => dispatch(setIsSwitched(true))}>
        <span>На главную</span>
      </Link>
    </div>
  )
}

export default NotFound
