import { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { ISort } from '../../models/pizzaAPIType';
import { useGetSortQuery } from '../../redux';
import { setSortTag } from '../../redux/reducers/sort';
import '../../scss/app.scss';

export const Sort = () => {
  const { data = [], isLoading } = useGetSortQuery('');
  const dispatch = useAppDispatch();
  const [activeItem, setActiveItem] = useState<ISort>({
    id: 1,
    sortName: 'популярности (убыв.)',
  });

  const [isActivePopup, setIsActivePopup] = useState<boolean>(false);

  const handlerOnClick = (item: ISort) => {
    setActiveItem({ id: item.id, sortName: item.sortName });
    dispatch(setSortTag({ sortName: item.sortName }));
  };

  const rootEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(isActivePopup){
      const onClick = (e: any) => rootEl?.current?.contains(e.target) || setIsActivePopup(false);
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }
  }, [isActivePopup]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="sort" ref={rootEl}>
          <div className="sort__label">
            <svg
              className={isActivePopup ? 'active' : ''}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
              />
            </svg>
            <b>Сортировка по:</b>
            <span onClick={() => setIsActivePopup(!isActivePopup)}>{activeItem.sortName}</span>
          </div>
          {isActivePopup && (
            <div className="sort__popup">
              <ul>
                {data.map((item) => (
                  <li
                    className={item.id === activeItem.id ? 'active' : ''}
                    key={item.id}
                    onClick={() => handlerOnClick(item)}>
                    {item.sortName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};
