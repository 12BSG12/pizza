import { useState } from 'react';
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort/Sort';
import { useAppSelector } from './hooks/hooks';
import { useGetPizzaQuery } from './redux';
import './scss/app.scss';

export const App = () => {
  const { data = [], isLoading } = useGetPizzaQuery('');
  const { catID, title } = useAppSelector((state) => state.categories);
  const [sortTag, setSortTag] = useState<'price' | 'category' | 'title'>('category');

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort setSortTag={setSortTag}/>
          </div>
          <h2 className="content__title">{title} пиццы</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="content__items">
              {catID !== 0
                ? data
                    .filter((item) => item.category === catID)
                    .sort((a: any, b: any) => a[sortTag] - b[sortTag])
                    .map((item) => <PizzaBlock {...item} key={item.id} />)
                : [...data]
                    .sort((a: any, b: any) => a[sortTag] - b[sortTag])
                    .map((item) => <PizzaBlock {...item} key={item.id} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
