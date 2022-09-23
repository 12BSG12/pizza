import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ICategories } from '../../models/pizzaAPIType';
import { useGetCategoriesQuery } from '../../redux';
import { setCurrentPage, setIdAndTitle } from '../../redux/reducers/sort';
import '../../scss/app.scss';
import { Skeleton } from './Skeleton';

export const Categories = () => {
  const dispatch = useAppDispatch();

  const { catID } = useAppSelector((state) => state.sort);

  const { data = [], isLoading } = useGetCategoriesQuery('');

  const handleOnClick = (item: ICategories) => {
    dispatch(setIdAndTitle({ catID: item.id, title: item.catName }));
    dispatch(setCurrentPage(1))
  };

  return (
    <div className="categories">
      {isLoading ? (
        <Skeleton />
      ) : (
        <ul>
          {data.map((item, index) => (
            <li
              className={item.id === catID ? 'active' : ''}
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
