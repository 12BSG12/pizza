import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { ICategories } from '../models/pizzaAPIType';
import { useGetCategoriesQuery } from '../redux';
import { setIdAndTitle } from '../redux/reducers/categories';
import '../scss/app.scss';

export const Categories = () => {
  const dispatch = useAppDispatch();

  const { data = [], isLoading } = useGetCategoriesQuery('');

  const [activeItem, setActiveItem] = useState<number>(0);

  const handleOnClick = (item: ICategories) => {
    setActiveItem(item.id);
    dispatch(setIdAndTitle({ catID: item.id, title: item.catName }));
  };

  return (
    <div className="categories">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.map((item) => (
            <li
              className={item.id === activeItem ? 'active' : ''}
              key={item.id}
              onClick={() => handleOnClick(item)}>
              {item.catName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
