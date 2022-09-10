import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { IPizza, ISize, IType } from '../../models/pizzaAPIType';
import { useSetPizzaInfoMutation } from '../../redux';
import { setCartData } from '../../redux/reducers/cart';
import '../../scss/app.scss';

export const PizzaBlock: FC<IPizza> = ({ id, imageUrl, title, types, sizes, price, category }) => {
  const dispatch = useAppDispatch();
  const [ setPizzaInfo] = useSetPizzaInfoMutation()
  const [countPizza, setCountPizza] = useState<number>(0);

  const [activePizzaCat, setActivePizzaCat] = useState<IType>({
    id: types[0].id,
    name: types[0].name,
  });

  const [activePizzaSize, setActivePizzaSize] = useState<ISize>({
    id: sizes[0].id,
    size: sizes[0].size,
  });

  const handleOnClick = () => {
    setCountPizza(countPizza + 1);
    dispatch(
      setCartData({
        id,
        title,
        imageUrl,
        types: activePizzaCat.name,
        sizes: activePizzaSize.size,
        price,
        countPizza: countPizza + 1,
      }),
    );
  };
  const handleSetPizzaInfo = async () => {
    await setPizzaInfo({id, title, imageUrl, price, info: '123'}).unwrap()
  }
  return (
    <div className="pizza-block">
      <Link to={'/pizza_info/' + id} onClick={handleSetPizzaInfo}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((item) => (
            <li
              className={item.id === activePizzaCat.id ? 'active' : ''}
              key={item.id}
              onClick={() => setActivePizzaCat({ id: item.id, name: item.name })}>
              {item.name}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((item) => (
            <li
              className={item.id === activePizzaSize.id ? 'active' : ''}
              key={item.id}
              onClick={() => setActivePizzaSize({ id: item.id, size: item.size })}>
              {item.size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div className="button button--outline button--add" onClick={handleOnClick}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {countPizza !== 0 && <i>{countPizza}</i>}
        </div>
      </div>
    </div>
  );
};
