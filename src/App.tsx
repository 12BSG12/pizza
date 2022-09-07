import { Categories } from './components/Categories/Categories';
import { Header } from './components/Header/Header';
import { PizzaBlock } from './components/PizzaBlock/PizzaBlock';
import { Sort } from './components/Sort/Sort';
import { useAppSelector } from './hooks/hooks';
import { useGetPizzaQuery } from './redux';
import './scss/app.scss';

export const App = () => {
  const { catID, title } = useAppSelector((state) => state.categories);
  const { sortTag, sortName } = useAppSelector((state) => state.sort);
  const { data = [], isLoading, isFetching } = useGetPizzaQuery({sortName, catID, sortTag });

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">{title} пиццы</h2>
          {isLoading || isFetching ? (
            <div>Loading...</div>
          ) : (
            <div className="content__items">
              {data.map((item) => (
                <PizzaBlock {...item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
