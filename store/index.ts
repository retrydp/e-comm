import { configureStore } from '@reduxjs/toolkit';
import displayInterface from './displayInterface';
import authStore from './authStore';
import adminPanelStore from './adminPanelStore';
import adminProduct from './adminProduct';
import adminUser from './adminUser';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    display: displayInterface,
    authStore,
    adminPanelStore,
    adminProduct,
    adminUser,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
