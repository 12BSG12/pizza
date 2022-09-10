import '../scss/app.scss';
import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Sort } from '../components/Sort/Sort';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useGetPizzaQuery } from '../redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { setPage } from '../redux/reducers/pagination';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { catID, title } = useAppSelector((state) => state.categories);
  const { sortTag, sortName } = useAppSelector((state) => state.sort);
  const { page } = useAppSelector((state) => state.pagination);
  const { searchText } = useAppSelector((state) => state.header);
  const { data, isLoading, isFetching } = useGetPizzaQuery({
    page: page,
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
      {isLoading || isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className="content__items">
          {data?.data.map((item) => (
            <PizzaBlock {...item} key={item.id} />
          ))}
        </div>
      )}
      <Stack spacing={2}>
        <Pagination
          className="MuiButtonBase-root"
          count={Math.ceil(data?.totalCount !== undefined && catID === 0 ? data.totalCount / 4 : 1)}
          page={page}
          onChange={(_, num) => dispatch(setPage(num))}
        />
      </Stack>
    </div>
  );
};
