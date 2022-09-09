import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
 page: 1 as number
};

const paginationReducer = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
  },
});

export const { setPage } = paginationReducer.actions;
export default paginationReducer.reducer;
