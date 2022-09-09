import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import '../scss/app.scss';

export const PizzaInfo = () => {
  const {title, imageUrl, price, info} = useAppSelector(state => state.pizzaInfo)
  return (
    <div className='container'>
      <div className='pizza-info'>
        <div className='pizza-info__left'>
          <img
            src={imageUrl??''}
            alt="Pizza"
          />
          <h2>Пицца {title?.toLowerCase()} цена от {price} ₽</h2>
          <Link to='/'>
            <button className="button button--outline button--add"><span>Назад</span></button>
          </Link>
        </div>
        <div className="pizza-info__right">
          {info}
        </div>
      </div>
    </div>
  );
};
