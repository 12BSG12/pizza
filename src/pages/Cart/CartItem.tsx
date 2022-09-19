import { FC, useState } from 'react';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { useAppDispatch } from '../../hooks/hooks';
import { cartDataType } from '../../models/cartType';
import { useDelCartMutation, useUpdateCartMutation } from '../../redux';
import { removeCartCount, addCartCount } from '../../redux/reducers/cart';
import '../../scss/app.scss';

export const CartItem: FC<cartDataType> = ({
  id,
  title,
  imageUrl,
  types,
  sizes,
  price,
  countPizza,
}) => {
  const dispatch = useAppDispatch();
  const [delCart] = useDelCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const handleDelCart = async () => {
    await delCart(id).unwrap();
    dispatch(removeCartCount({ countPizza, price }));
  };

  const body = { id, title, imageUrl, types, sizes, price, countPizza };
  const defaultPrice = price / countPizza

  const handleOnClickMinus = async () => {
    await updateCart({
      ...body,
      countPizza: countPizza - 1,
      price: price - defaultPrice,
    });
    dispatch(removeCartCount({ price: defaultPrice }));
  };

  const handleOnClickPlus = async () => {
    await updateCart({
      ...body,
      countPizza: countPizza + 1,
      price: price + defaultPrice,
    });
    dispatch(addCartCount({ price: defaultPrice }));
  };

  const[open, setOpen] = useState<boolean>(false);

  const openModalWindow = () => {
    setOpen(true)
  }

  const closeModalWindow = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="cart__item">
        <div className="cart__item-img">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </div>
        <div className="cart__item-info">
          <h3>{title}</h3>
          <p>
            {types}, {sizes} см.
          </p>
        </div>
        <div className="cart__item-count">
          <button
            className="button button--outline button--circle cart__item-count-minus"
            disabled={countPizza === 1}
            onClick={handleOnClickMinus}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </button>
          <b>{countPizza}</b>
          <button
            className="button button--outline button--circle cart__item-count-plus"
            onClick={handleOnClickPlus}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </button>
        </div>
        <div className="cart__item-price">
          <b>{price} ₽</b>
        </div>
        <div className="cart__item-remove">
          <div className="button button--outline button--circle" onClick={openModalWindow}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              />
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              />
            </svg>
          </div>
        </div>
      </div>
      <ModalWindow open={open} closeModalWindow={closeModalWindow}>
        <h2 className='modal__title'>Вы действительно хотите удалить товар?</h2>
        <div className="cart__bottom-buttons">
          <div className="button pay-btn" onClick={handleDelCart}>
            <span>Да</span>
          </div>
          <div className="button button--outline button--add go-back-btn" onClick={closeModalWindow}>
            <span>Нет</span>
          </div>
        </div>
      </ModalWindow>
    </>
  );
};
