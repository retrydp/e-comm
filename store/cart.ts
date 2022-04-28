import { createSlice } from '@reduxjs/toolkit';import { ProductSchema } from '../utils/types';
import Cookies from 'js-cookie';

interface CartProduct extends ProductSchema {
  count: number;
}

interface CartInitialState {
  products: CartProduct[];
}

const initialState: CartInitialState = {
  products: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart') as string)
    : [],
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const productIndex = state.products.findIndex(
        ({ slug }) => slug === product.slug
      );
      if (productIndex === -1) {
        state.products.push({ ...product, count: 1 });
      } else {
        state.products[productIndex].count += 1;
      }
    },
    incrementCount: (state, action) => {
      const product = action.payload;
      const productIndex = state.products.findIndex(
        ({ slug }) => slug === product.slug
      );
      state.products[productIndex].count += 1;
    },
    decrementCount: (state, action) => {
      const product = action.payload;
      const productIndex = state.products.findIndex(
        ({ slug }) => slug === product.slug
      );
      state.products[productIndex].count -=
        state.products[productIndex].count > 1 ? 1 : 0;
    },
    deleteProduct: (state, action) => {
      const product = action.payload;
      state.products = state.products.filter(
        ({ slug }) => slug !== product.slug
      );
    },
  },
});

export const { addProduct, incrementCount, decrementCount, deleteProduct } =
  cart.actions;

export default cart.reducer;
