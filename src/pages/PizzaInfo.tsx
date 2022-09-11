import { Link } from 'react-router-dom';
import { useGetPizzaInfoQuery, useSetPizzaInfoMutation } from '../redux';
import '../scss/app.scss';

export const PizzaInfo = () => {
  const { data, isLoading, isFetching } = useGetPizzaInfoQuery('');
  const [setPizzaInfo] = useSetPizzaInfoMutation();

  const handleDelPizzaInfo = async () => {
    await setPizzaInfo({ title: null, imageUrl: null, price: 0, info: null }).unwrap();
  };
  return (
    <div className="container">
      {isLoading || isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className="pizza-info">
          <div className="pizza-info__left">
            <img src={data?.imageUrl ?? ''} alt="Pizza" />
            <h2>
              Пицца {data?.title?.toLowerCase()} цена от {data?.price} ₽
            </h2>
            <Link to="/" onClick={handleDelPizzaInfo}>
              <button className="button button--outline button--add">
                <span>Назад</span>
              </button>
            </Link>
          </div>
          <div className="pizza-info__right">{data?.info}</div>
        </div>
      )}
    </div>
  );
};
