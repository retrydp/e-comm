import { configureStore } from '@reduxjs/toolkit';
import displayInterface from './displayInterface';
import adminPanelStore from './adminPanelStore';
import adminProduct from './adminProduct';
import adminUser from './adminUser';
import favorites from './favorites';
import cart, { CartProduct } from './cart';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import Cookie from 'js-cookie';
import throttle from 'lodash.throttle';

const saveState = (nextState: CartProduct[], key: string) =>
  Cookie.set(key, JSON.stringify(nextState));

const store = configureStore({
  reducer: {
    display: displayInterface,
    adminPanelStore,
    adminProduct,
    adminUser,
    cart,
    favorites,
  },
  devTools: process.env.NODE_ENV === 'development',
});

store.subscribe(
  throttle(() => saveState(store.getState().cart.cartProducts, 'cart'), 1000)
);

export default store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
