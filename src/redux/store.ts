import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { pizzaAPI } from './reducers/pizzaAPI';
import headerReducer from './reducers/header';
import categoriesReducer from './reducers/categories';
import sortReducer from './reducers/sort';
import cartReducer from './reducers/cart';

const rootReducer = combineReducers({
  [pizzaAPI.reducerPath]: pizzaAPI.reducer,
  header: headerReducer,
  categories: categoriesReducer,
  sort: sortReducer,
  cart: cartReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pizzaAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch