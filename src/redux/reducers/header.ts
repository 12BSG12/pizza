import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { headerType } from '../../models/headerType'

const initialState: headerType = {
  allCount: 0,
  allSum: 0
}

const categoriesReducer = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setAllCount(state, action: PayloadAction<{allSum: number}>) {
      const {allSum} = action.payload
      state.allCount += 1;
      state.allSum += allSum
    }
  }
})

export const { setAllCount } = categoriesReducer.actions
export default categoriesReducer.reducer