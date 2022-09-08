import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { headerType } from '../../models/headerType'

const initialState: headerType = {
  searchText: '',
  isSwitched: true,
}

const headerReducer = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload
    },
    setIsSwitched(state, action: PayloadAction<boolean>) {
      state.isSwitched = action.payload
    },
  }
})

export const { setSearchText, setIsSwitched} = headerReducer.actions
export default headerReducer.reducer