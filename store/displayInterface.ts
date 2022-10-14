import { createSlice } from '@reduxjs/toolkit';
export interface DisplayInterface {
  minMaxPrice: number[];
  availableColors: string[];
  availableBrands: string[];
  currentProduct?: string;
}

const initialState: DisplayInterface = {
  minMaxPrice: [0, 0],
  availableBrands: [],
  availableColors: [],
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
  },
});

export const {
  setMinMaxPrice,
  setAvailableColors,
  setAvailableBrands,
  setCurrentProduct,
} = displayInterface.actions;

export default displayInterface.reducer;
