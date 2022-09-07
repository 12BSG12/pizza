import '../scss/app.scss';
import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Sort } from '../components/Sort/Sort';
import { useAppSelector } from '../hooks/hooks';
import { useGetPizzaQuery } from '../redux';

export const Home = () => {
  const { catID, title } = useAppSelector((state) => state.categories);
  const { sortTag, sortName } = useAppSelector((state) => state.sort);
  const { data = [], isLoading, isFetching } = useGetPizzaQuery({ sortName, catID, sortTag });
  const { searchText } = useAppSelector((state) => state.header);
  
  return (
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
          {data
            .filter((item) => item.title.toLocaleLowerCase().includes(searchText.toLowerCase()))
            .map((item) => (
              <PizzaBlock {...item} key={item.id} />
            ))}
        </div>
      )}
    </div>
  );
};
