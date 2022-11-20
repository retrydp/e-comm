import { createSlice } from '@reduxjs/toolkit';
import commonConst from '../constants/common';

export interface DisplayInterface {
  minMaxPrice: number[];
  availableColors: string[];
  availableBrands: string[];
  currentProduct?: string;
  productsQuantity: number;
}

const initialState: DisplayInterface = {
  minMaxPrice: [0, 0],
  availableBrands: [],
  availableColors: [],
  productsQuantity: parseInt(commonConst.DEFAULT_LIMIT),
};

const displayInterface = createSlice({
  name: 'displayInterface',
  initialState,
  reducers: {
    setMinMaxPrice: (state, action) => {
      state.minMaxPrice = action.payload;
    },
    setAvailableColors: (state, action) => {
      state.availableColors = action.payload;
    },
    setAvailableBrands: (state, action) => {
      state.availableBrands = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setProductsQuantity: (state, action) => {
      state.productsQuantity = action.payload;
    },
  },
});

export const {
  setMinMaxPrice,
  setAvailableColors,
  setAvailableBrands,
  setCurrentProduct,
  setProductsQuantity,
} = displayInterface.actions;

export default displayInterface.reducer;
