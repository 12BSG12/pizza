import { Link } from 'react-router-dom';
import { useDelPizzaInfoMutation, useGetPizzaInfoQuery } from '../redux';
import '../scss/app.scss';

export const PizzaInfo = () => {
  const {data = [], isLoading, isFetching } = useGetPizzaInfoQuery('');
  const [delPizzaInfo] = useDelPizzaInfoMutation()
  
  const handleDelPizzaInfo = async (id: number) => {
    await delPizzaInfo(id).unwrap();
  }
  return (
    <div className="container">
      {isLoading || isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className="pizza-info">
          <div className="pizza-info__left">
            <img src={data[0]?.imageUrl ?? ''} alt="Pizza" />
            <h2>
              Пицца {data[0]?.title?.toLowerCase()} цена от {data[0]?.price} ₽
            </h2>
            <Link to="/" onClick={() => handleDelPizzaInfo(data[0].id)}>
              <button className="button button--outline button--add">
                <span>Назад</span>
              </button>
            </Link>
          </div>
          <div className="pizza-info__right">{data[0]?.info}</div>
        </div>
      )}
    </div>
  );
};
