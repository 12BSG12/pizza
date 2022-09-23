import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { categoriesType, sortType } from '../../models/sortType'

const initialState: sortType = {
  catID: 0,
  title: 'Все',
  sortTag: 'category',
  sortName: 'популярности (убыв.)',
  currentPage: 1,
}

const sortReducer = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setIdAndTitle(state, action: PayloadAction<categoriesType>) {
      const {catID, title} = action.payload
      state.catID = catID;
      state.title = title
    },
    setSortTag (state, action: PayloadAction<{sortName: string}>) {
      const {sortName} = action.payload
      state.sortName = sortName
      if(sortName.includes('популярности')){
        state.sortTag = 'category'
      } else if(sortName.includes('цене')){
        state.sortTag = 'price'
      } else {
        state.sortTag = 'title'
      }
    },
    setCurrentPage (state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  }
})

export const { setSortTag, setCurrentPage, setIdAndTitle } = sortReducer.actions
export default sortReducer.reducer