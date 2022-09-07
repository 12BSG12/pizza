import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cartDataType, cartType } from '../../models/cartType';

const initialState: cartType = {
  cartData: [],
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
      //state.cartData = state.cartData.filter((item, index, arr) => arr.findIndex(item => item.id) === index)
    },
    clearCartData(state) {
      state.cartData.length = 0;
    },
    removeCartDataByID(state, action: PayloadAction<number>) {
      state.cartData = state.cartData.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setCartData, clearCartData, removeCartDataByID } = cartReducer.actions;
export default cartReducer.reducer;
