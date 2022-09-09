import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pizzaInfoType } from '../../models/pizzaInfoType';

const initialState: pizzaInfoType = {
  title: null,
  imageUrl: null,
  price: 0,
  info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
};

const pizzaInfoReducer = createSlice({
  name: 'pizzaInfo',
  initialState,
  reducers: {
    setPizzaInfo(state, action: PayloadAction<pizzaInfoType>) {
      const { title, imageUrl, price } = action.payload;
      state.title = title;
      state.imageUrl = imageUrl;
      state.price = price;
    },
  },
});

export const { setPizzaInfo } = pizzaInfoReducer.actions;
export default pizzaInfoReducer.reducer;
