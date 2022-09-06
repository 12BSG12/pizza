import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sortType } from '../../models/sortType'

const initialState: sortType = {
  sortTag: 'category'
}

const sortReducer = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortTag (state, action: PayloadAction<{sortName: string}>) {
      const {sortName} = action.payload
      if(sortName.includes('популярности')){
        state.sortTag = 'category'
      } else if(sortName.includes('цене')){
        state.sortTag = 'price'
      } else {
        state.sortTag = 'title'
      }
    }
  }
})

export const { setSortTag } = sortReducer.actions
export default sortReducer.reducer