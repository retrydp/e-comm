import { createSlice } from '@reduxjs/toolkit';export type SortParams = 'popular' | 'new' | 'asc' | 'desc';

export interface DisplayInterface {
  brand: string;
  sort: SortParams;
  color: string[];
  sliderValue: number[];
  minMaxPrice: number[];
  quantity: number;
  availableColors: string[];
  availableBrands: string[];
}

const initialState: DisplayInterface = {
  brand: 'all',
  sort: 'new',
  color: [],
  sliderValue: [0, 0],
  minMaxPrice: [0, 0],
  quantity: 12,
  availableBrands: [],
  availableColors: [],
};

const displayInterface = createSlice({
  name: 'displayInterface',
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setSliderValue: (state, action) => {
      state.sliderValue = action.payload;
    },

    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setMinMaxPrice: (state, action) => {
      state.minMaxPrice = action.payload;
    },
    setAvailableColors: (state, action) => {
      state.availableColors = action.payload;
    },
    setAvailableBrands: (state, action) => {
      state.availableBrands = action.payload;
    },
  },
});

export const {
  setBrand,
  setSort,
  setColor,
  setSliderValue,
  setQuantity,
  setMinMaxPrice,
  setAvailableColors,
  setAvailableBrands,
} = displayInterface.actions;

export default displayInterface.reducer;
