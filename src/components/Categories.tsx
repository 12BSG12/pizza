import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { setIdAndTitle } from '../redux/reducers/categories';
import '../scss/app.scss';

export const Categories = () => {
  const dispatch = useAppDispatch();
  
  const [activeItem, setActiveItem] = useState<number>(0);

  const catArr = [
    { id: 0, catName: 'Все' },
    { id: 1, catName: 'Мясные' },
    { id: 2, catName: 'Вегетарианская' },
    { id: 3, catName: 'Гриль' },
    { id: 4, catName: 'Острые' },
    { id: 5, catName: 'Закрытые' },
  ];

  const handleOnClick = (item: { id: number; catName: string }) => {
    setActiveItem(item.id);
    dispatch(setIdAndTitle({catID: item.id, title: item.catName}))
  };

  return (
    <div className="categories">
      <ul>
        {catArr.map((item) => (
          <li
            className={item.id === activeItem ? 'active' : ''}
            key={item.id}
            onClick={() => handleOnClick(item)}>
            {item.catName}
          </li>
        ))}
      </ul>
    </div>
  );
};
