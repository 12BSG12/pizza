import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { categoriesType } from '../../models/categoriesType'

const initialState: categoriesType = {
  catID: 0,
  title: 'Все'
}

const categoriesReducer = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setIdAndTitle(state, action: PayloadAction<categoriesType>) {
      const {catID, title} = action.payload
      state.catID = catID;
      state.title = title
    }
  }
})

export const { setIdAndTitle } = categoriesReducer.actions
export default categoriesReducer.reducer