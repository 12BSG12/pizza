import '../scss/app.scss';
import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort/Sort';
import { useAppSelector } from '../hooks/hooks';
import { useGetPizzaQuery } from '../redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSearchParams } from 'react-router-dom';
import { FC } from 'react';
import { cartDataType } from '../models/pizzaAPIType';

export const Home:FC<{cart: cartDataType[]}> = ({cart}) => {
  const { catID, title } = useAppSelector((state) => state.categories);
  const { searchText } = useAppSelector((state) => state.header);
  const { sortTag, sortName } = useAppSelector((state) => state.sort);
  const [pageParams, setPageParams] = useSearchParams();
  const pizzaPageQuery = pageParams.get('page') || '1';

  const handleOnChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
    let page = {};
    if (value) page = { page: value };
    else page = '';
    setPageParams(page);
  };

  const { data, isLoading, isFetching } = useGetPizzaQuery({
    page: Number(pizzaPageQuery),
    limit: catID === 0 ? 4 : 0,
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
      {isLoading || isFetching? (
        [...Array(!data?.data ? 4 : data.data.length)].map((_, index) => <Skeleton key={index}/>)
      ) : (
        <div className="content__items">
          {data?.data.map((item) => (
            <PizzaBlock {...item} cart={cart.find(el => el.id === item.id)} key={item.id} />
          ))}
        </div>
      )}
      <Stack spacing={2}>
        <Pagination
          className="MuiButtonBase-root"
          count={Math.ceil(data?.totalCount !== undefined && catID === 0 ? data.totalCount / 4 : 1)}
          page={Number(pizzaPageQuery)}
          onChange={handleOnChangePage}
        />
      </Stack>
    </div>
  );
};
