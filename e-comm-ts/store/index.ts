import { configureStore } from '@reduxjs/toolkit';
import currentActiveTab from '../store/currentActiveTab';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
const store = configureStore({
  reducer: currentActiveTab,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
