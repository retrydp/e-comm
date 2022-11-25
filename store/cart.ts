import { createSlice } from '@reduxjs/toolkit';
import { ProductSchema } from '../utils/types';
import Cookies from 'js-cookie';

export interface CartProduct extends ProductSchema {
  count: number;
}

interface CartInitialState {
  cartProducts: CartProduct[];
}

const initialState: CartInitialState = {
  cartProducts: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart') as string)
    : [],
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartAddProduct: (state, action) => {
      const product = action.payload;
      const productIndex = state.cartProducts.findIndex(
        ({ slug }) => slug === product.slug
      );
      if (productIndex === -1) {
        state.cartProducts.push({ ...product, count: 1 });
      } else {
        state.cartProducts[productIndex].count += 1;
      }
    },
    cartIncrementCount: (state, action) => {
      const product = action.payload;
      const productIndex = state.cartProducts.findIndex(
        ({ slug }) => slug === product.slug
      );
      state.cartProducts[productIndex].count += 1;
    },
    cartDecrementCount: (state, action) => {
      const product = action.payload;
      const productIndex = state.cartProducts.findIndex(
        ({ slug }) => slug === product.slug
      );
      state.cartProducts[productIndex].count -=
        state.cartProducts[productIndex].count > 1 ? 1 : 0;
    },
    cartDeleteProduct: (state, action) => {
      const product = action.payload;
      state.cartProducts = state.cartProducts.filter(
        ({ slug }) => slug !== product.slug
      );
    },
  },
});

export const {
  cartAddProduct,
  cartIncrementCount,
  cartDecrementCount,
  cartDeleteProduct,
} = cart.actions;

export default cart.reducer;
