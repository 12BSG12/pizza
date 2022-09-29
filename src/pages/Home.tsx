import '../scss/app.scss';
import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort/Sort';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useGetPizzaQuery } from '../redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { cartDataType } from '../models/pizzaAPIType';
import { setCurrentPage } from '../redux/reducers/sort';

export const Home: FC<{ cart: cartDataType[] }> = ({ cart }) => {
  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state) => state.sort);
  const { catID, title, sortTag, sortName, currentPage } = useAppSelector((state) => state.sort);
  
  const handleOnChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  const { data, isLoading, isFetching } = useGetPizzaQuery({
    page: currentPage,
    limit: 4,
    sortName,
    catID,
    sortTag,
    search: searchText,
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{title} пиццы</h2>
      <div className="content__items">
        {isLoading || isFetching
          ? [...Array(!data?.data ? 4 : data?.totalCount)].map((_, index) => (
              <Skeleton key={index} />
            ))
          : data?.data.map((item) => (
              <PizzaBlock {...item} cart={cart.find((el) => el.id === item.id)} key={item.id} />
            ))}
      </div>
      <Stack spacing={2}>
        <Pagination
          className="MuiButtonBase-root"
          count={Math.ceil(data?.totalCount !== undefined ? data.totalCount / 4 : 1)}
          page={currentPage}
          onChange={handleOnChangePage}
        />
      </Stack>
    </div>
  );
};
