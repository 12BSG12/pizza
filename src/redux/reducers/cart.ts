import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cartDataType, cartType } from '../../models/cartType';

const initialState: cartType = {
  allSum: 0,
  allCount: 0,
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearAllCount(state) {
      state.allCount = 0;
      state.allSum = 0;
    },
    removeCartCount(state, action: PayloadAction<{ price: number; countPizza?: number }>) {
      const { countPizza, price } = action.payload;
      if (countPizza) {
        state.allCount -= countPizza;
      } else {
        state.allCount -= 1;
      }
      state.allSum -= price;
    },
    addCartCount(state, action: PayloadAction<{ price: number }>) {
      const { price } = action.payload;
      state.allCount += 1;
      state.allSum += price;
    },
    setAllCount(state, action: PayloadAction<cartDataType[]>) {
      state.allCount = action.payload.reduce((prev, current) => prev + current.countPizza, 0);
      state.allSum = action.payload.reduce((prev, current) => prev + current.price, 0);
    },
  },
});

export const { clearAllCount, removeCartCount, setAllCount, addCartCount } = cartReducer.actions;
export default cartReducer.reducer;
