import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pizzaAPI } from './reducers/pizzaAPI';
import sortReducer from './reducers/sort';
import cartReducer from './reducers/cart';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  [pizzaAPI.reducerPath]: pizzaAPI.reducer,
  sort: sortReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [pizzaAPI.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pizzaAPI.middleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
