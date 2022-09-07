import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { headerType } from '../../models/headerType'

const initialState: headerType = {
  allCount: 0,
  allSum: 0,
  searchText: '',
  isSwitched: true
}

const headerReducer = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setAllCount(state, action: PayloadAction<{allSum: number}>) {
      const {allSum} = action.payload
      state.allCount += 1;
      state.allSum += allSum
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload
    },
    setIsSwitched(state, action: PayloadAction<boolean>) {
      state.isSwitched = action.payload
    }
  }
})

export const { setAllCount, setSearchText, setIsSwitched } = headerReducer.actions
export default headerReducer.reducer