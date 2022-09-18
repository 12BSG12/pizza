import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { ICategories } from '../../models/pizzaAPIType';
import { useGetCategoriesQuery } from '../../redux';
import { setIdAndTitle } from '../../redux/reducers/categories';
import '../../scss/app.scss';
import { Skeleton } from './Skeleton';

export const Categories = () => {
  const dispatch = useAppDispatch();
  const [_, setPageParams] = useSearchParams();
  const { data = [], isLoading } = useGetCategoriesQuery('');

  const [activeItem, setActiveItem] = useState<number>(0);

  const handleOnClick = (item: ICategories) => {
    setActiveItem(item.id);
    dispatch(setIdAndTitle({ catID: item.id, title: item.catName }));
    setPageParams({page: '1' });
  };

  return (
    <div className="categories">
      {isLoading ? (
        <Skeleton />
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
