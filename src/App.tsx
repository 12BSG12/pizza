import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort';
import { useAppSelector } from './hooks/hooks';
import { useGetPizzaQuery } from './redux';
import './scss/app.scss';

export const App = () => {
  const { data = [], isLoading } = useGetPizzaQuery('');
  const { catID, title } = useAppSelector((state) => state.categories);
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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="content__items">
              {catID !== 0
                ? data
                    .filter((item) => item.category === catID)
                    .map((item) => <PizzaBlock {...item} key={item.id} />)
                : data.map((item) => <PizzaBlock {...item} key={item.id} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
