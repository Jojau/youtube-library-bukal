import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import listReducer from '../features/list/listSlice';
import searchBarReducer from '../features/searchBar/searchBarSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    list: listReducer,
    searchBar: searchBarReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
