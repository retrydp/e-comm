import { configureStore } from '@reduxjs/toolkit';
import displayInterface from './displayInterface';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
const store = configureStore({
  reducer: { display: displayInterface },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
