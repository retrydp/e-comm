import { createSlice } from '@reduxjs/toolkit';

export type Brands = 'nike' | 'airmax' | 'adidas' | 'vans' | 'all';
export type SortParams = 'popular' | 'new' | 'asc' | 'desc';
export type View = 'module' | 'list';
export type AvailableColors =
  | 'black'
  | 'blue'
  | 'brown'
  | 'green'
  | 'grey'
  | 'multicolour'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'white'
  | 'yellow';

export interface DisplayInterface {
  brand: Brands;
  sort: SortParams;
  color: AvailableColors[] | [];
  sliderValue: number[];
  view: View;
  quantity: number;
}

const initialState: DisplayInterface = {
  brand: 'all',
  sort: 'new',
  color: [],
  sliderValue: [0, 331],
  view: 'module',
  quantity: 12,
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
    setView: (state, action) => {
      state.view = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
  },
});

export const {
  setBrand,
  setSort,
  setColor,
  setSliderValue,
  setView,
  setQuantity,
} = displayInterface.actions;

export default displayInterface.reducer;
