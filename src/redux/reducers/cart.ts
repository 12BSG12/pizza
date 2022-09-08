import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cartDataType, cartType } from '../../models/cartType';

const initialState: cartType = {
  cartData: [],
  allSum: 0,
  allCount: 0,
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData(state, action: PayloadAction<cartDataType>) {
      const { id, title, imageUrl, types, sizes, price, countPizza } = action.payload;
      state.cartData.push({
        id,
        title,
        imageUrl,
        types,
        sizes,
        price: price * countPizza,
        countPizza,
      });
      //баг, нужен фикс
      state.cartData = state.cartData.sort((a, b) => b.price - a.price).filter(
        (item, index, arr) => arr.findIndex((_item) => _item.id === item.id) === index,
      );
      state.allCount += 1;
      state.allSum += price;
    },
    clearCartData(state) {
      state.cartData.length = 0;
      state.allCount = 0;
      state.allSum = 0;
    },
    removeCartDataByID(
      state,
      action: PayloadAction<{ id: number; price: number; countPizza: number }>,
    ) {
      const { id, price, countPizza } = action.payload;
      state.cartData = state.cartData.filter((item) => item.id !== id);
      state.allCount -= countPizza;
      state.allSum -= price;
    },
  },
});

export const { setCartData, clearCartData, removeCartDataByID } = cartReducer.actions;
export default cartReducer.reducer;
